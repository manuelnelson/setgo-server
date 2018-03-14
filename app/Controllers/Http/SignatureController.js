'use strict'
let APIError = use('App/Services/APIError');
const aws = use('aws-sdk');
const myBucket = 'mannys-starter-bucket';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

//Will retrieve aws signature to allow for upload of a document
class SignatureController {
  async show ({params}) {
    let s3 = new aws.S3({signatureVersion: 'v2'}); //not sure specifying signature version is necessarily needed
    console.log(params.filetype)
    var s3params = {
      Bucket: myBucket,
      Key: `photos/${params.filename}`,
      Expires: 60,
      ContentType: decodeURIComponent(params.filetype) 
    };
    console.log(s3params)
    let url = await s3.getSignedUrl('putObject', s3params);
    console.log(url);
    return {url: url};
  }

}

module.exports = SignatureController

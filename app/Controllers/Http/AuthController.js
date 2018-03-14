'use strict'
let APIError = use('App/Services/APIError');
let httpStatus = use('http-status');

class AuthController {
    async user({request, auth}){
        try {
            const user = await auth.getUser();            
            return {user: user}
        } catch (error) {
            throw new APIError('User not logged in', httpStatus.UNAUTHORIZED)
        }
    }

    async login({request, auth}){
        try{
            const authResponse = await auth.attempt(request.input('email'), request.input('password'))   
            console.log(authResponse)
            return {token: authResponse.token};
        } catch (error) {
            throw new APIError('Invalid Login', httpStatus.BAD_REQUEST)
        }
    }
    async logout({request, auth}){
        return;
    }
}

module.exports = AuthController

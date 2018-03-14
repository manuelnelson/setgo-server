'use strict'
let APIError = use('App/Services/APIError');
const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if(error instanceof APIError){
      return response.status(error.status).send({messages:error.message, status: error.status})
    }
    if(Env.get('NODE_ENV') == 'development'){
      console.error(error)
      response.status(error.status).send({message:error.message})
    }
    else{
      response.status(error.status).send({message:`We're sorry - there was an error during your request`});      
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler

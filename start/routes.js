'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const defaultApiRoute = '/api/v1'

Route
  .group('users', () => {
    Route.resource('/users', 'UserController')
      .apiOnly()    
  })
  .prefix(defaultApiRoute)
  .formats(['json'])

Route
  .group('gos', () => {
    Route.resource('/gos', 'GoController')
      .apiOnly()    
  })
  .middleware('auth')
  .prefix(defaultApiRoute)
  .formats(['json'])

Route
  .group('auth', () => {
    Route.get('/auth/user', 'AuthController.user') 
    .middleware('auth')

    Route.post('/auth/login', 'AuthController.login')
    Route.post('/auth/logout', 'AuthController.logout')
    
  })
  .prefix(defaultApiRoute)
  .formats(['json'])

Route.get('/signatures/:filename/:filetype', 'SignatureController.show')
  .prefix(defaultApiRoute)
  .formats(['json'])

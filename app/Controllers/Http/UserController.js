'use strict'
let httpStatus = use('http-status');
// remember to add these to the top of file after 'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')
let APIError = use('App/Services/APIError');
class UserController {


    
    async index () {
        return await User.all()
    }
    
    async show ({ params }) {
        return await User.find(params.id)
    }

    async store ({ request, session, auth, response }) {
        const rules = {
            name: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            throw new APIError(validation.messages(), httpStatus.BAD_REQUEST)

            return response.redirect('back')
        }


        //return 'Validation passed'
        // persist to database
        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password')
        })
        // login the user
        let token = await auth.generate(user, true)

        // redirect to homepage
        return {token:token.token};
    }

    async update ({ params, request }) {
        return await User
          .query()
          .where({ id: params.id })
          .update(request.post())
    }
    
    async destroy ({ params }) {
        return await User
          .query()
          .where({ id: params.id })
          .delete()
    }
    
}

module.exports = UserController

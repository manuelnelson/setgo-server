'use strict'
let httpStatus = use('http-status');
// remember to add these to the top of file after 'use strict'
const Go = use('App/Models/Go')
//http://indicative.adonisjs.com/docs/dateformat
const {validate,rule} = use('Validator') 
let APIError = use('App/Services/APIError');
class GoController {


    
    async index ({request}) {
      console.log(request.get())
      const query = request.get();
      const completed = query.completed ? true : false; //if not defined, force false
      let gos = await Go.query().where({user_id:query.user_id,completed:query.completed})
      return {gos: gos}
    }
    
    async show ({ params }) {
        let gos = await Go.find(params.id)
        return {gos: gos}
    }

    async store ({ request, session, auth, response }) {
        const rules = {
            name: 'required',
            // startDateTime: rule('dateFormat', 'YYYY-MM-DD HH:mm:ss'),
            // endDateTime: rule('dateFormat', 'YYYY-MM-DD HH:mm:ss'),
            priority: 'integer',
            points: 'integer',
            category: 'integer',
            completed: 'boolean',
            user_id: 'required|integer',
            parent: 'integer'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            throw new APIError(validation.messages(), httpStatus.BAD_REQUEST)

            return response.redirect('back')
        }


        //return 'Validation passed'
        // persist to database
        const go = await Go.create(request.post())

        return {go:go};
    }

    async update ({ params, request }) {        
        let go = await Go
          .query()
          .where({ id: params.id })
          .update(request.post())
        console.log(go);
        return {go:request.post()}
    }
    
    async destroy ({ params }) {
        return await Go
          .query()
          .where({ id: params.id })
          .delete()
    }
    
}

module.exports = GoController

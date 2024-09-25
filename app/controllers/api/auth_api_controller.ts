import User from '#models/user';
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthApiController {
    async singin({request  ,response }: HttpContext) {
        let isPasswordValid  = false;
        const { email, password  } = request.only(['email', 'password'])
        const user = await User.findBy('email', email)
        if (user) {
            isPasswordValid = await hash.verify(user.password, password)
        }
        if (isPasswordValid && user) {
            const token = await User.accessTokens.create(user)
            return {
                "success": true,
                "connection" : true,
                "authData" : {
                    "authUserInfo": user,
                    "authUserToken": token.value!.release(),
                }
            }
        }else{
            return response.json({"success": false ,"connection" : true, "message" : "Email ou mot de passe incorrect."})
        }
    }
    async ping({auth ,response }: HttpContext) {
        const authUser =  await auth.authenticateUsing(['api']);
        console.log(authUser);
        if (authUser) {
           return  response.json({"success": true ,"isAuthenticated" : true, "message" : `You are ${authUser.fullName}`})
        }else{
            return  response.json({"success": true ,"isAuthenticated" : false, "message" : "You are Pong ? "})
        }
    }
}
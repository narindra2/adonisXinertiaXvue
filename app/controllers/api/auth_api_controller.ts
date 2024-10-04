import User from '#models/user';
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'
import { isEmaiAlreadyExist, sleepServer } from '../../helpers/global.js';

export default class AuthApiController {
    async sigin({ request, response }: HttpContext) {
        await sleepServer(5);
        let isPasswordValid = false;
        const { email, password } = request.only(['email', 'password'])
        const user = await User.findBy('email', email)
        if (user) {
            isPasswordValid = await hash.verify(user.password, password)
        }
        if (isPasswordValid && user) {
            const token = await User.accessTokens.create(user)
            return {
                "success": true,
                "connection": true,
                "authData": {
                    "authUserInfo": user,
                    "authUserToken": token.value!.release(),
                }
            }
        } else {
            return response.json({ "success": false, "connection": true, "message": "Email ou mot de passe incorrect." })
        }
    }
    async signup({ request, response }: HttpContext) {
        await sleepServer(5);
        const existEmail = await isEmaiAlreadyExist(request.input("email"));
        if (existEmail) {
            return response.json({ "success": false, "emaiAlreadyExist": true, "connection": true, "message": "Cet email est déjà utilisé." })
        }
        //    const user = await User.create(request.only(['email', 'password', 'full_name']))
        //    return response.status(201).json(user)
    }
    async ping({ auth, response }: HttpContext) {
        try {
            const authUser = await auth.authenticateUsing(['api']);
            return response.json({ "success": true, "isAuthenticated": true, "message": `You are ${authUser.fullName}` })
        } catch (error) {

        }
        try {
            return response.json({ "success": true, "isAuthenticated": false, "message": "You are Pong ? , Date :   " + new Date().toDateString() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() })
        } catch (error) {
            return response.json({ "success": true, "isAuthenticated": false, "message": error.message })
        }
    }
}
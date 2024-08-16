import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { RegisterUserValidator } from '#validators/register_user'
import { errors } from '@adonisjs/auth'
export default class AuthController {
    async login({inertia ,auth,response }: HttpContext) {
        const check =  await auth.check();
        if (check) {
           return response.redirect('/')
        }
        return inertia.render('auth/loginPage')
    }
    async doLogin({ request, auth,inertia ,response}: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        try {
            const user = await User.verifyCredentials(email, password)
            await auth.use('web').login(user)
            return response.redirect('/articles')
        } catch (error) {
            if (error instanceof errors.E_INVALID_CREDENTIALS) {
                return inertia.render('auth/loginPage',{messageError  :"Invalid user credentials" })
            }else{
                return inertia.render('auth/loginPage',{messageError  :error })
            }
        }
      }
    async register({  inertia }: HttpContext) {
        return inertia.render('auth/registerPage')
    }
    async registerUser({  request}: HttpContext) {
        await request.validateUsing(RegisterUserValidator)
        const user = await User.create(request.only(["fullName","email","password"]))
        return user
    }
    async logout({ auth, response}: HttpContext) {
        await auth.use('web').logout();
        return response.redirect('/login')
    }
    async authUserReal({  auth }: HttpContext) {
          /** get auth user */
          return await auth.authenticate()
          
    }
   
}
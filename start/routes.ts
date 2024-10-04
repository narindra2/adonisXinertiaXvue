/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PostsController = () => import('#controllers/posts_controller')
const AuthController = () => import('#controllers/auth_controller')
const AuthApiController = () => import('#controllers/api/auth_api_controller')


router.group(() => {
  router.post('sigin', [AuthApiController, 'sigin'])
  router.post('signup', [AuthApiController, 'signup'])
  router.get('ping', [AuthApiController, 'ping'])
  router.post('ping', [AuthApiController, 'ping'])

}).prefix('api')


router.get('/', [PostsController, 'index'])
router.on('/test').renderInertia('home', { version: 8 })

router.get('/login', [AuthController, 'login'])
router.post('/login', [AuthController, 'doLogin'])

router.get('/register', [AuthController, 'register'])
router.post('/register', [AuthController, 'registerUser'])

router.group(() => {
    router.get('/logout', [AuthController, 'logout'])
    router.get('/articles', [PostsController, 'index']).as("articles")
    router.get('/article/:id', [PostsController, 'show']).as('article.show')
    router.post('/update/article', [PostsController, 'update'])
}).use(middleware.auth())



/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PostsController = () => import('#controllers/posts_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', [PostsController, 'index'])
router.on('/test').renderInertia('home', { version: 8 })

router.get('/login', [AuthController, 'login'])
router.get('/logout', [AuthController, 'logout'])
router.post('/login', [AuthController, 'doLogin'])
router.get('/register', [AuthController, 'register'])
router.post('/register', [AuthController, 'registerUser'])

router.get('/articles', [PostsController, 'index']).as("articles")
router.get('/article/:id', [PostsController, 'show']).as('article.show')
router.post('/update/article', [PostsController, 'update'])
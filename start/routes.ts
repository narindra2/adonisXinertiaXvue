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

router.on('/').renderInertia('home', { version: 6 })
router.on('/test').renderInertia('home', { version: 8 })

router.get('/articles', [PostsController, 'index'])
router.get('/article/:id', [PostsController, 'show']).as('article.show')
router.post('/update/article', [PostsController, 'update'])
import Post from '#models/post'
import app from '@adonisjs/core/services/app'
// import emitter from '#start/events';
import type { HttpContext } from '@adonisjs/core/http'
// import transmit from '@adonisjs/transmit/services/main'
// import emitter from '@adonisjs/core/services/emitter'
import { cuid } from '@adonisjs/core/helpers'
export default class PostsController {
    async index({ inertia }: HttpContext) {
        const version = 6;
        const posts = await Post.query().limit(2000)
        return inertia.render('posts/index', { posts , version  })
    }
    async show({ inertia  , params }: HttpContext) {
        const post = await Post.findOrFail(params.id)
        // emitter.emit('post:consulted', post)
        
        return inertia.render('posts/show', { post})
    }
    async update({   response, request}: HttpContext) {
        const image = await request.file('image',{
            size: '2mb',
            extnames: ['gif'],
          });
        const path = 'public/post/images';
        let imagePath = null;
        if (image) {
            const imageName = cuid() +"." +image.extname;
            await image.move(app.makePath(path) ,{name :  path + "/" + imageName});
            imagePath = path + "/" + imageName;
        }
        const post = await Post.updateOrCreate({ id : request.input("id") }, { ...request.except(["id" , "updatedAt" ,"createdAt"]) , ...{image : imagePath } })
        return response.redirect().status(301).toRoute('article.show', { id: post.id })
    }
}
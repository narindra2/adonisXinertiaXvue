import Post from '#models/post'
import app from '@adonisjs/core/services/app'
// import emitter from '#start/events';
import type { HttpContext } from '@adonisjs/core/http'
// import transmit from '@adonisjs/transmit/services/main'
// import emitter from '@adonisjs/core/services/emitter'
import {createPostValidator } from '#validators/create_post'
import { generateImageNameUsingCuid, generateImagNameWithPath, POST_IMAGE_URL } from '../helpers/global.js'

export default class PostsController {
    async index({ inertia , auth ,response ,request}: HttpContext) {
       const check =  await auth.check();
        if (!check) {
           return response.redirect('/login')
        }
        // const authUser =  await auth.authenticate();
         /** end auth user */
        const version = 6;
        const page = request.input('page', 1)
        const posts = await Post.query().paginate(page, 10)
        posts.baseUrl('/articles')
        return inertia.render('posts/index', { posts , version  })
    }
    async show({ inertia  , params }: HttpContext) {
        var post = await Post.findOrFail(params.id)
        // emitter.emit('post:consulted', post)
        return inertia.render('posts/show', { post})
    }
    /**   */
    async update({   response, request}: HttpContext) {
        await request.validateUsing(createPostValidator)
        const image = await request.file('image');
        let imagePath = "null";
        if (image) {
            const imageName = generateImageNameUsingCuid(image.extname);
            await image.move(app.makePath(POST_IMAGE_URL) ,{name :  imageName});
            imagePath = generateImagNameWithPath(POST_IMAGE_URL ,imageName);
        }
        const post = await Post.updateOrCreate({ id : request.input("id") }, { ...request.only(["title" , " content" ,"online"]) , ...{image : imagePath } })
        return response.redirect().status(301).toRoute('article.show', { id: post.id })
    }
}
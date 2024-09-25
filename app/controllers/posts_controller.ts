import Post from '#models/post'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
// import emitter from '@adonisjs/core/services/emitter'
import {createPostValidator } from '#validators/create_post'
import { generateFileNameUsingCuid, generateFilePath, POST_FILES_URL } from '../helpers/global.js'

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
        const search = request.input('search', '')
        const posts = await Post.query()
        .if(search, (query) => {
            query.where('title', 'like', `%${search}%`)
            query.orWhere('content', 'like', `%${search}%`)
        })
        .paginate(page, 2)
        posts.baseUrl('/articles');
        return inertia.render('posts/index', { posts , version ,searchProps :search  })
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
            const imageName = generateFileNameUsingCuid(image.extname);
            await image.move(app.makePath(POST_FILES_URL) ,{name :  imageName});
            imagePath = generateFilePath(POST_FILES_URL ,imageName);
        }
        const post = await Post.updateOrCreate({ id : request.input("id") }, { ...request.only(["title" , " content" ,"online"]) , ...{image : imagePath } })
        return response.redirect().status(301).toRoute('article.show', { id: post.id })
    }
}
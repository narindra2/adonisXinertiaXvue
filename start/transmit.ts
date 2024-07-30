import transmit from '@adonisjs/transmit/services/main'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
transmit.authorizeChannel<{ id: string }>('post/:id/consulted', async  (ctx: HttpContext, { id }) => {
    const post = await Post.find(+id);
    console.log("authorizeChannel");
    
    if (post == null) {
        return false;
    }else{
        return true;
    }
    return ctx.auth.user?.id === +id 
  })

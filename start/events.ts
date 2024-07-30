import Emittery from 'emittery';
import transmit from '@adonisjs/transmit/services/main'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
const emitter = new Emittery();
transmit.authorizeChannel<{ id: string }>('post/:id/consulted', async  (ctx: HttpContext, { id }) => {
  const post = await Post.find(+id);
  if (post == null) {
      return false;
  }else{
      return true;
  }
  return ctx.auth.user?.id === +id 
})
emitter.on('post:consulted', (post) => {
    const postJSON = post.serialize() 
    console.log("post consulted");
    setTimeout(() => {
      transmit.broadcast('post/'+ post.id+'/consulted', { post: postJSON })
    }, 2000);
  });
export default emitter;

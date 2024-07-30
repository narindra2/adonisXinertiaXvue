import Post from '#models/post'
import transmit from '@adonisjs/transmit/services/main'

export default class SendNotification {
    handle(post: Post) {
        const postJSON = post.serialize()
        transmit.broadcast('chats/1/messages', { post: postJSON })
      }
}
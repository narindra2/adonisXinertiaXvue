
import Post from '#models/post'

declare module '@adonisjs/core/types' {
    interface EventsList {
      'post:consulted': Post
    }
}
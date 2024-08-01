import vine from '@vinejs/vine'
/**
 * Validates the post's creation action
 */
export const createPostValidator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(6),
      content: vine.string().trim().escape(),
      image: vine.file({
        size: '2mb',
        extnames: ['gif',"zip" ,"png","jpg"]
      }).nullable()
    })
  )
  
  /**
   * Validates the post's update action
   */
  export const updatePostValidator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(6),
      content: vine.string().trim().escape(),image: vine.file({
        size: '2mb',
        extnames: ['gif',"zip" ,"png","jpg"]
      }).nullable(),
      
    })
  )
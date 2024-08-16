import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true
/**
 * Validates the registe user  
 */
export const RegisterUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(4),
        email: vine.string().email().unique(async (db, value, field) => {
            const user = await db
              .from('users')
              .whereNot('id', field.meta.userId || 0)
              .where('email', value)
              .first()
            return !user
          }),
        password: vine.string().minLength(4),
        confirmPassword: vine.string().sameAs("password"),
    })
)
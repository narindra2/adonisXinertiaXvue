import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true
/**
 * Validates the registe user  
 */
export const RegisterUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(4),
        email: vine.string().email().minLength(6),
        password: vine.string().minLength(4),
    })
)
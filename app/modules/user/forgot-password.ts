import { Arg, Mutation, Resolver } from 'type-graphql'
import { sendEmail } from '../../utils/send-email'
import { createUrlToken, TOKEN_TYPE } from '../../utils/create-url-token'
import { User } from '../../entity/user'

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg('email') email: string): Promise<boolean> {
        const user = await User.findOne({where: {email}})
        if (!user) return true
        await sendEmail(email, await createUrlToken(user.id, TOKEN_TYPE.FORGOT_PASSWORD), 'Reset your password')
        return true
    }
}
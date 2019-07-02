import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
// import { Authorized } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/user'
import { RegisterInput } from './register/register-input'
import { isAuth } from '../../middleware/is-auth'
import { sendEmail } from '../../utils/send-email'
import { createUrlToken, TOKEN_TYPE } from '../../utils/create-url-token'

@Resolver()
export class RegisterResolver {
    // @Authorized()
    @UseMiddleware(isAuth)
    @Query(() => String)
    async hello() {
        return 'Hello World'
    }

    @Mutation(() => User)
    async register(@Arg('data')
    {
        firstName,
        lastName,
        email,
        password,
    }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save()

        await sendEmail(email, await createUrlToken(user.id, TOKEN_TYPE.ACCOUNT_VALIDATION))

        return user
    }
}

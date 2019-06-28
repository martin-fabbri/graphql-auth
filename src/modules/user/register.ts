import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
// import { Authorized } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/user'
import { RegisterInput } from './register/register-input'
import { isAuth } from '../../middleware/is-auth'

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

        return user
    }
}

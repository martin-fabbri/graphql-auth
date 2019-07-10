import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/user'
import { AppContext } from '../../types/app-context'

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() ctx: AppContext
    ): Promise<User | null> {
        console.log('LoginResolver ... processing request',email)
        const user = await User.findOne({ where: { email } })
        if (!user) return null
        if (!user.confirmed) return null

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return null

        if (!ctx.req.session) return null
        ctx.req.session.userId = user.id

        console.log('LoginResolver ... returning user:', user)

        return user
    }
}

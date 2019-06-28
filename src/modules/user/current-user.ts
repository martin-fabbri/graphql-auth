import { Resolver, Query, Ctx } from 'type-graphql'
import { User } from '../../entity/user'
import { AppContext } from '../../types/app-context'

@Resolver()
export class LoggedInUserResolver {
    @Query(() => User, {nullable: true})
    async loggedInUser(@Ctx() ctx: AppContext): Promise<User | null | undefined> {
        if (!ctx.req.session || !ctx.req.session.userId) return null
        return User.findOne(ctx.req.session.userId)
    }
}
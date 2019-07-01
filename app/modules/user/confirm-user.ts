import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/user'
import { redis } from '../../redis'

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(@Arg('token') token: string): Promise<boolean> {
        const userId = await redis.get(token)
        if (!userId) return false

        const user = await User.findOne({ where: { id: userId } })
        if (!user) return false

        await User.update({ id: parseInt(userId) }, { confirmed: true })
        await redis.del(token)

        return true
    }
}

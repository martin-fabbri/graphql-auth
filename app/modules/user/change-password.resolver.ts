import { Arg, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/user'
import { redis } from '../../redis'
import { ChangePasswordInput } from '../change-password/change-password-input'

const HASH_SALT = 12

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(@Arg('data')
    {
        token,
        password,
    }: ChangePasswordInput): Promise<User | null> {
        const userId = await redis.get(token)
        console.log('using token to get user from redis', userId)
        if (!userId) return null

        const user = await User.findOne(userId)
        console.log('user match', user)

        if (!user) return null
        user.password = await bcrypt.hash(password, HASH_SALT)
        await user.save()

        await redis.del(token)

        return user
    }
}

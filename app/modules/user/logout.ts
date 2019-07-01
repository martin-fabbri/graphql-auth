import { Ctx, Mutation, Resolver } from 'type-graphql'
import { AppContext } from '../../types/app-context'
import { SESSION_COOKIE_SESSION } from '../../index'

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: AppContext): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!ctx.req || !ctx.req.session) return reject(false)

            ctx.req.session.destroy(error => {
                if (error) {
                    console.log('Error destroying session: ', error)
                    return reject(false)
                }

                ctx.res.clearCookie(SESSION_COOKIE_SESSION)
                return resolve(true)
            })
        })
    }
}

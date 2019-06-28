import { MiddlewareFn } from 'type-graphql'
import { AppContext } from '../types/app-context'

export const isAuth: MiddlewareFn<AppContext> = async ({context: {req}}, next) => {
    if (!req || !req.session || !req.session.userId) return new Error('Not authorized')
    return next()
}
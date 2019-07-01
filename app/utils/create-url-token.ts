import { v4 } from 'uuid'
import { redis } from '../redis'
import { REDIS_ACCOUNT_VALIDATION_EMAIL, REDIS_FORGOT_PASSWORD_PREFIX } from '../constants/redis-prefixes'

export enum TOKEN_TYPE {
    ACCOUNT_VALIDATION = 'ACCOUNT_VALIDATION',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}

export const createUrlToken = async (userId: number, type = TOKEN_TYPE.ACCOUNT_VALIDATION) => {
    let urlRoute = 'confirm'
    let prefix = REDIS_ACCOUNT_VALIDATION_EMAIL

    switch (type) {
        case TOKEN_TYPE.ACCOUNT_VALIDATION:
            // default
            break
        case TOKEN_TYPE.FORGOT_PASSWORD:
            urlRoute = 'forgot'
            prefix = REDIS_FORGOT_PASSWORD_PREFIX
            break
    }

    const token = `${prefix}-${v4()}`

    await redis.set(token, userId, 'ex', 60 * 60)
    console.log('stored token for userId:', userId, token)

    return `http://localhost:3000/${urlRoute}/${token}`
}

import { v4 } from 'uuid'
import { redis } from '../redis'

export const createConfirmationUrl = async (userId: number) => {
    const token = v4()
    redis.set(token, userId, 'ex', 60 * 60)
    return `http://localhost:3000/confirm/${token}`
}

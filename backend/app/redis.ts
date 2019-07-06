import RedisClient from 'ioredis'

export const redis = new RedisClient({ host: 'redis', port: 6379 })

import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/register'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { redis } from './redis'
import { LoginResolver } from './modules/user/login'
import { LoggedInUserResolver } from './modules/user/current-user'
// import { LoggedInUserResolver } from './modules/user/current-user'

const SESSION_SECRET = 'co0kies#shou1d$be%Kept@secret'

const main = async () => {
    await createConnection()

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, LoggedInUserResolver],
    })
    const apolloServer = new ApolloServer({
        schema,
        context: ({req}: any) => ({req})
    })

    const app = express()
    const RedisStore = connectRedis(session)
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }))

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: 'qid',
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24,
            }
        })
    )

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('Server started on http://localhost:4000/graphql')
    })
}

main()

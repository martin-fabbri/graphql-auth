import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
// import { AuthChecker } from 'type-graphql'
import { createConnection } from 'typeorm'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { redis } from './redis'
// import { AppContext } from './types/app-context'
// import { LoggedInUserResolver } from './modules/user/current-user'

export const SESSION_COOKIE_SESSION = 'qid'
const SESSION_SECRET = 'co0kies#shou1d$be%Kept@secret'


// export const customAuthChecker: AuthChecker<AppContext> = ({context: {req}}) => {
//     if (!req || !req.session) return false;
//     console.log('req.session.qid', req.session.userId)
//     return !!req.session.userId;
// };

const main = async () => {
    await createConnection()

    const schema = await buildSchema({
        resolvers: [`${__dirname}/modules/**/*.ts`],
//        authChecker: customAuthChecker,
    })
    const apolloServer = new ApolloServer({
        schema,
        context: ({req, res}: any) => ({req, res})
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
            name: SESSION_COOKIE_SESSION,
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

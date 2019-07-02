import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import queryComplexity, { fieldConfigEstimator, simpleEstimator } from 'graphql-query-complexity'
import { createConnection } from 'typeorm'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { redis } from './redis'
import createSchema from './utils/create-schema'
// import { AppContext } from './types/app-context'
// import { LoggedInUserResolver } from './modules/user/current-user'
// import { AuthChecker } from 'type-graphql'

export const SESSION_COOKIE_SESSION = 'qid'
const SESSION_SECRET = 'co0kies#shou1d$be%Kept@secret'

// export const customAuthChecker: AuthChecker<AppContext> = ({context: {req}}) => {
//     if (!req || !req.session) return false;
//     console.log('req.session.qid', req.session.userId)
//     return !!req.session.userId;
// };

const main = async () => {
    await createConnection()

    const schema = await createSchema()

    const apolloServer = new ApolloServer({
        schema,
        context: ({req, res}: any) => ({req, res}),
        validationRules: [
            queryComplexity({
                // The maximum allowed query complexity, queries above this threshold will be rejected
                maximumComplexity: 8,
                // The query variables. This is needed because the variables are not available
                // in the visitor of the graphql-js library
                variables: {},
                // Optional callback function to retrieve the determined query complexity
                // Will be invoked whether the query is rejected or not
                // This can be used for logging or to implement rate limiting
                onComplete: (complexity: number) => {
                    console.log("Query Complexity:", complexity);
                },
                estimators: [
                    // Using fieldConfigEstimator is mandatory to make it work with type-graphql
                    fieldConfigEstimator(),
                    // This will assign each field a complexity of 1 if no other estimator
                    // returned a value. We can define the default value for fields not explicitly annotated
                    simpleEstimator({
                        defaultComplexity: 1,
                    }),
                ],
            }) as any
        ],
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

import { buildSchema } from 'type-graphql'
import { SCHEMA_RESOLVERS } from '../constants/graphql-schema'

const createSchema = () => buildSchema({
    resolvers: SCHEMA_RESOLVERS,
})

export default createSchema
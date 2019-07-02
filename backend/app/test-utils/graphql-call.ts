import { graphql } from 'graphql'
import createSchema from '../utils/create-schema'
import Maybe from 'graphql/tsutils/Maybe'

interface Options {
    source: string
    variableValues?: Maybe<{ [key: string]: any }>
}

export const graphqlCall = async ({source, variableValues}: Options) => {
    const schema = await createSchema()

    return graphql({
        schema,
        source,
        variableValues
    })
}
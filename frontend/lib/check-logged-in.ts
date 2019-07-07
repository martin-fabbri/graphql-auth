import gql from 'graphql-tag'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

const getUserQuery = gql`
    query getUser {
        user {
            id
            name
        }
    }
`

const checkLoggedIn = (apolloClient: ApolloClient<NormalizedCacheObject>) =>
    apolloClient
        .query({
            query: getUserQuery,
        })
        .then(({ data }) => {
            return { loggedInUser: data }
        })
        .catch(() => {
            // Fail gracefully
            return { loggedInUser: {} }
        })

export default checkLoggedIn

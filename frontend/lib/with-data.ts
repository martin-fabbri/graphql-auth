import ApolloClient, {
    NormalizedCacheObject,
    Operation,
    PresetConfig,
} from 'apollo-boost'
import withApollo, { InitApolloOptions } from 'next-with-apollo'

const BACKEND_ENDPOINT =
    process.env.BACKEND_ENDPOINT || 'http://localhost:4000/graphql'

const createClient = <T>({
    headers,
}: InitApolloOptions<T>): ApolloClient<T> => {
    const apolloConfig: PresetConfig = {
        uri: BACKEND_ENDPOINT,
        request: (operation: Operation) => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            })
        },
    }

    return new ApolloClient(apolloConfig)
}

export default withApollo<NormalizedCacheObject>(createClient)

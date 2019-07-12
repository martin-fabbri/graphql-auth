import { useRouter } from 'next/router'
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import React from 'react'
import SuccessfulConfirmation from '../../components/successful-confirmation'
import {
    ConfirmUserMutationMutation,
    ConfirmUserMutationVariables,
} from '../../generated/apollo-components'
import { CONFIRM_USER_MUTATION } from '../../graphql/user/mutations/confirm'

interface InitialProps {
    isConfirmed: boolean
}

interface Query {
    token: string
}

interface AppContext {
    query: Query
    apolloClient: ApolloClient<NormalizedCacheObject>
}

interface StatelessPage<P = {}> extends React.FunctionComponent<P> {
    getInitialProps?: (ctx: AppContext) => Promise<P>
}

const Confirm: StatelessPage<InitialProps> = ({ isConfirmed }) => {
    const router = useRouter()
    if (!router || !router.query || !router.query.token)
        return <p>Error: unable to validate account</p>
    return isConfirmed ? <SuccessfulConfirmation /> : <p>Error!</p>
}

Confirm.getInitialProps = async ({ query: { token }, apolloClient }) => {
    if (!token) return { isConfirmed: false }
    const response = await apolloClient.mutate<
        ConfirmUserMutationMutation,
        ConfirmUserMutationVariables
    >({ mutation: CONFIRM_USER_MUTATION, variables: { token } })
    if (!response || !response.data) return { isConfirmed: false }
    const isConfirmed = response.data.confirmUser
    return { isConfirmed }
}

export default Confirm

import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import SignInForm from '../components/sign-in-form'

interface InitialProps {
    loggedInUser: boolean
}

const IndexPage: NextPage<InitialProps> = () => {
    return (
        <Layout title="Home | GraphQL Auth">
            <h1>Sign In</h1>
            <SignInForm />
        </Layout>
    )
}

// IndexPage.getInitialProps = async (
//     context: Context,
//     apolloClient: ApolloClient<NormalizedCacheObject>
// ) => {
//     console.log(context, apolloClient)
//     return Promise.resolve({ loggedInUser: false })
// }

export default IndexPage

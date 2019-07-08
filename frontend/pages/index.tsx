import * as React from 'react'
import Layout from '../components/layout'
import { NextPage } from 'next'
import SignInForm from '../components/sign-in-form'

/** Globally include scoped button styling */
import '@zendeskgarden/react-buttons/dist/styles.css'

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

export default IndexPage

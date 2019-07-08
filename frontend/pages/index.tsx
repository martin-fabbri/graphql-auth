import * as React from 'react'
import Layout from '../components/layout'
import { NextPage } from 'next'
import SignInForm from '../components/sign-in-form'

import '@zendeskgarden/css-bedrock/dist/index.css'
import '@zendeskgarden/react-buttons/dist/styles.css'
import '@zendeskgarden/react-forms/dist/styles.css'
import '@zendeskgarden/react-chrome/dist/styles.css'

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

import App, { AppProps, Container } from 'next/app'
import React from 'react'
import ApolloProvider from 'react-apollo/ApolloProvider'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

interface AuthAppProps extends AppProps {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

class AuthApp extends App {
    render() {
        const { Component, pageProps, apolloClient } = this
            .props as AuthAppProps
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        )
    }
}

export default AuthApp

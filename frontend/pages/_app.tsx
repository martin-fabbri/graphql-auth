import App, { AppContext, AppInitialProps, AppProps, Container } from 'next/app'
import React from 'react'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ParsedUrlQuery } from 'querystring'
import ApolloProvider from 'react-apollo/ApolloProvider'
import Layout from '../components/layout'
import withData from '../lib/with-data'

interface PageProps {
    query?: ParsedUrlQuery
}

interface WithDataProps<T> extends AppProps<T> {
    apollo: ApolloClient<NormalizedCacheObject>
}

const getInitialProps = async ({
    Component,
    ctx,
}: AppContext): Promise<AppInitialProps> => {
    let pageProps: PageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
}

class CustomApp extends App<WithDataProps<any>> {
    static getInitialProps = getInitialProps

    render() {
        const { apollo, Component, pageProps } = this.props
        return (
            <Container>
                <Layout>
                    <ApolloProvider client={apollo}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </Layout>
            </Container>
        )
    }
}

export default withData(CustomApp)

import App, { AppProps, Container, AppContext, AppInitialProps } from 'next/app'
import React from 'react'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import withData from '../lib/with-data'
import { ParsedUrlQuery } from 'querystring'
import ApolloProvider from 'react-apollo/ApolloProvider'
import Page from '../components/page'

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
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(CustomApp)

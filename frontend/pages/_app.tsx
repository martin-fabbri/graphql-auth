import App, { AppProps, Container, AppContext, AppInitialProps } from 'next/app'
import React from 'react'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import withData from '../lib/with-data'
import { ParsedUrlQuery } from 'querystring'

export interface AppProps extends AppInitialProps {
    apollo: ApolloClient<NormalizedCacheObject>
}

interface PageProps {
    query?: ParsedUrlQuery
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

class CustomApp extends App<AppProps<any>> {
    static getInitialProps = getInitialProps

    render() {
        const { Component, pageProps, ...otherProps } = this.props
        return (
            <Container>
                <Component {...pageProps} {...otherProps} />
            </Container>
        )
    }
}

export default withData(CustomApp)

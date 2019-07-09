import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Chrome, Body, Content, Main } from '@zendeskgarden/react-chrome'
import styled from 'styled-components'
import Head from 'next/head'
import WelcomeSidebar from './welcome-sidebar'
import AppHeader from './app-header'
import AppNav from './app-nav'

const PaddedMain = styled(Main)`
    padding: 28px;
`

interface Props {
    title?: string
}

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = 'Home',
}) => (
    <ThemeProvider>
        <Chrome>
            <Head>
                <title>{title}</title>
            </Head>
            <AppNav />
            <Body>
                <AppHeader />
                <Content>
                    <WelcomeSidebar />
                    <PaddedMain>
                        <>{children}</>
                    </PaddedMain>
                </Content>
            </Body>
        </Chrome>
    </ThemeProvider>
)

export default Layout

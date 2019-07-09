import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import {
    Chrome,
    Body,
    Content,
    Main,
    Nav,
    NavItem,
    NavItemIcon,
    NavItemText,
    Header,
    HeaderItem,
    HeaderItemIcon,
    HeaderItemText,
    HeaderItemWrapper,
} from '@zendeskgarden/react-chrome'
import styled from 'styled-components'
import Head from 'next/head'
import ZendeskIcon from '@zendeskgarden/svg-icons/src/26/user-lock.svg'
import HomeIcon from '@zendeskgarden/svg-icons/src/26/home-fill.svg'
import PersonIcon from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg'
import SupportIcon from '@zendeskgarden/svg-icons/src/26/relationshape-support.svg'
import MenuTrayIcon from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg'

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
            <Nav>
                <NavItem logo title="Zendesk Garden">
                    <NavItemIcon>
                        <ZendeskIcon />
                    </NavItemIcon>
                    <NavItemText>Zendesk Garden</NavItemText>
                </NavItem>
                <NavItem title="Home" current>
                    <NavItemIcon>
                        <HomeIcon />
                    </NavItemIcon>
                    <NavItemText>Home</NavItemText>
                </NavItem>
            </Nav>
            <Body>
                <Header standalone={false}>
                    <HeaderItem logo product="support">
                        <HeaderItemIcon>
                            <SupportIcon />
                        </HeaderItemIcon>
                        <HeaderItemText>Zendesk Support</HeaderItemText>
                    </HeaderItem>
                    <HeaderItemWrapper maxX>
                        <span>GraphQL Super Token</span>
                    </HeaderItemWrapper>
                    <HeaderItem>
                        <HeaderItemIcon>
                            <MenuTrayIcon />
                        </HeaderItemIcon>
                        <HeaderItemText clipped>Products</HeaderItemText>
                    </HeaderItem>
                    <HeaderItem round>
                        <HeaderItemIcon>
                            <PersonIcon />
                        </HeaderItemIcon>
                        <HeaderItemText clipped>User</HeaderItemText>
                    </HeaderItem>
                </Header>
                <Content>
                    <PaddedMain>
                        <>{children}</>
                    </PaddedMain>
                </Content>
            </Body>
        </Chrome>
    </ThemeProvider>
)

export default Layout

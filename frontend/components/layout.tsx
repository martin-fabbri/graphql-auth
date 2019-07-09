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
    Sidebar,
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
                    <HeaderItemWrapper maxX round>
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
                    <Sidebar style={{ padding: 28 }}>
                        <h2>Example Sidebar</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </Sidebar>
                    <PaddedMain>
                        <>{children}</>
                    </PaddedMain>
                </Content>
            </Body>
        </Chrome>
    </ThemeProvider>
)

export default Layout

import React from 'react'
import {
    Nav,
    NavItem,
    NavItemIcon,
    NavItemText,
} from '@zendeskgarden/react-chrome'
import ZendeskIcon from '@zendeskgarden/svg-icons/src/26/user-lock.svg'
import HomeIcon from '@zendeskgarden/svg-icons/src/26/home-fill.svg'

const AppNav: React.FunctionComponent = () => (
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
)

export default AppNav

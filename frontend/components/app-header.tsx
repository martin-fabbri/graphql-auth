import React from 'react'
import {
    Header,
    HeaderItem,
    HeaderItemIcon,
    HeaderItemText,
    HeaderItemWrapper,
} from '@zendeskgarden/react-chrome'
import PersonIcon from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg'
import SupportIcon from '@zendeskgarden/svg-icons/src/26/relationshape-support.svg'
import MenuTrayIcon from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg'

const AppHeader: React.FunctionComponent = () => (
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
)

export default AppHeader

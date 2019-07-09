import React from 'react'

import { XL } from '@zendeskgarden/react-typography'
import styled from 'styled-components'
import { Sidebar } from '@zendeskgarden/react-chrome'

const SidebarConatainer = styled(Sidebar)`
    width: 50%;
    padding: 28px;
`

const WelcomeSidebar: React.FunctionComponent = () => (
    <SidebarConatainer>
        <h2>
            <XL>Welcome</XL>
        </h2>
        <p>
            A Full Stack session management solution implemented on top of
            NodeJS, Redis and GraphQL.
        </p>
        <img src="/static/hero.svg" alt="Hero - Super Token" />
    </SidebarConatainer>
)

export default WelcomeSidebar

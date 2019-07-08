import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Chrome, Body, Content, Main } from '@zendeskgarden/react-chrome'
import styled from 'styled-components'

interface Props {
    title?: string
}

const PaddedMain = styled(Main)`
    padding: 28px;
`

const Layout: React.FunctionComponent<Props> = props => (
    <ThemeProvider>
        <Chrome>
            <Body>
                <Content>
                    <PaddedMain>
                        <>{props.children}</>
                    </PaddedMain>
                </Content>
            </Body>
        </Chrome>
    </ThemeProvider>
)

export default Layout

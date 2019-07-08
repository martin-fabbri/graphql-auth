import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Button } from '@zendeskgarden/react-buttons'

interface Props {
    title?: string
}

const Layout: React.FunctionComponent<Props> = () => (
    <ThemeProvider>
        <Button>test</Button>
    </ThemeProvider>
)

export default Layout

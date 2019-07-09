import * as React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import {
    zdColorBlue700,
    zdFontSizeLg,
    zdSpacing,
} from '@zendeskgarden/css-variables'

import '@zendeskgarden/css-bedrock/dist/index.css'
import '@zendeskgarden/react-buttons/dist/styles.css'
import '@zendeskgarden/react-forms/dist/styles.css'
import '@zendeskgarden/react-chrome/dist/styles.css'

import { MD, LG, XL } from '@zendeskgarden/react-typography'

interface InitialProps {
    loggedInUser: boolean
}

const Title = styled.h1`
    margin-bottom: ${zdSpacing};
    color: ${zdColorBlue700};
    font-size: ${zdFontSizeLg};
`

const IndexPage: NextPage<InitialProps> = () => {
    return (
        <>
            <Title>GraphQL Super Token</Title>
            <LG>Sign in to view your profile</LG>
            <MD>Sign in to view your profile</MD>
            <XL>Sign in to view your profile</XL>

        </>
    )
}

export default IndexPage

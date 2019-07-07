import React, { FC } from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
    background: white;
    color: ${props => props.theme.black};
`

const Page: FC = ({ children }) => {
    return <PageContainer>{children}</PageContainer>
}

export default Page

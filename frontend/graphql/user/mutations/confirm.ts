import gql from 'graphql-tag'

export const CONFIRM_USER_MUTATION = gql`
    mutation confirmUserMutation($token: String!) {
        confirmUser(token: $token)
    }
`

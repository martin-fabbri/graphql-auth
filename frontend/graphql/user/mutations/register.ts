import gql from 'graphql-tag'

export const REGISTER_MUTATION = gql`
    mutation REGISTER_MUTATION($data: RegisterInput!) {
        register(data: $data) {
            id
            firstName
            lastName
            email
        }
    }
`

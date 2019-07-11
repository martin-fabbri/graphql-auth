export type Maybe<T> = T | null

export interface ChangePasswordInput {
    token: string

    password: string
}

export interface RegisterInput {
    firstName: string

    lastName: string

    email: string

    password: string
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any

// ====================================================
// Documents
// ====================================================

export type LoginVariables = {
    email: string
    password: string
}

export type LoginMutation = {
    __typename?: 'Mutation'

    login: Maybe<LoginLogin>
}

export type LoginLogin = {
    __typename?: 'User'

    id: string

    email: string

    name: string
}

export type RegisterMutationVariables = {
    data: RegisterInput
}

export type RegisterMutationMutation = {
    __typename?: 'Mutation'

    register: RegisterMutationRegister
}

export type RegisterMutationRegister = {
    __typename?: 'User'

    id: string

    firstName: string

    lastName: string

    email: string
}

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'

// ====================================================
// Components
// ====================================================

export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            name
        }
    }
`
export class LoginComponent extends React.Component<
    Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
    render() {
        return (
            <ReactApollo.Mutation<LoginMutation, LoginVariables>
                mutation={LoginDocument}
                {...(this as any)['props'] as any}
            />
        )
    }
}
export type LoginProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
    TChildProps
export type LoginMutationFn = ReactApollo.MutationFn<
    LoginMutation,
    LoginVariables
>
export function LoginHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              LoginMutation,
              LoginVariables,
              LoginProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
    >(LoginDocument, operationOptions)
}
export const RegisterMutationDocument = gql`
    mutation REGISTER_MUTATION($data: RegisterInput!) {
        register(data: $data) {
            id
            firstName
            lastName
            email
        }
    }
`
export class RegisterMutationComponent extends React.Component<
    Partial<
        ReactApollo.MutationProps<
            RegisterMutationMutation,
            RegisterMutationVariables
        >
    >
> {
    render() {
        return (
            <ReactApollo.Mutation<
                RegisterMutationMutation,
                RegisterMutationVariables
            >
                mutation={RegisterMutationDocument}
                {...(this as any)['props'] as any}
            />
        )
    }
}
export type RegisterMutationProps<TChildProps = any> = Partial<
    ReactApollo.MutateProps<RegisterMutationMutation, RegisterMutationVariables>
> &
    TChildProps
export type RegisterMutationMutationFn = ReactApollo.MutationFn<
    RegisterMutationMutation,
    RegisterMutationVariables
>
export function RegisterMutationHOC<TProps, TChildProps = any>(
    operationOptions:
        | ReactApollo.OperationOption<
              TProps,
              RegisterMutationMutation,
              RegisterMutationVariables,
              RegisterMutationProps<TChildProps>
          >
        | undefined
) {
    return ReactApollo.graphql<
        TProps,
        RegisterMutationMutation,
        RegisterMutationVariables,
        RegisterMutationProps<TChildProps>
    >(RegisterMutationDocument, operationOptions)
}

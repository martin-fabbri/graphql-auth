import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
import { Mutation, MutationFn } from 'react-apollo'
import gql from 'graphql-tag'

interface FormData {
    email: string
    password: string
}

interface SignInData {
    id: string
    firstName: string
    lastName: string
    email: string
    name: string
}

type SignInUserMutationFn = MutationFn<FormData, SignInData>

const SIGN_IN_MUTATION = gql`
    mutation SignIn($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            firtName
            lastName
            email
            name
        }
    }
`

const SignInForm: React.FC = (client: any) => {
    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
    })

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        setForm({
            ...form,
            [name]: val,
        })
    }

    const handleOnCompleted = (data: SignInData) => {
        console.log(data, client)
    }

    const handleOnError = (error: any) => {
        console.log(error)
    }

    const handleOnSubmit = (e: FormEvent, signInUser: SignInUserMutationFn) => {
        e.preventDefault()
        console.log(signInUser)
    }

    return (
        <Mutation
            mutation={SIGN_IN_MUTATION}
            variables={form}
            onCompleted={handleOnCompleted}
            onError={handleOnError}
        >
            {(signInUser: SignInUserMutationFn, { error }: any) => (
                <form onSubmit={e => handleOnSubmit(e, signInUser)}>
                    {error && <p>Error: ${error}</p>}
                    <Field>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            placeholder="Email"
                            onChange={handleFormChange}
                        />
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Input
                            name="password"
                            placeholder="Password"
                            onChange={handleFormChange}
                        />
                    </Field>
                    <Button>Sign in</Button>
                </form>
            )}
        </Mutation>
    )
}

export default SignInForm

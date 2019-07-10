import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
// import { Mutation } from 'react-apollo'
// import gql from 'graphql-tag'
// import { SIGN_IN_MUTATION } from '../graphql/user/mutations/login'
import { LoginComponent, LoginMutationFn } from '../generated/apollo-components'
// import { LoginComponent, LoginMutation, LoginVariables } from '../generated/apollo-components'

interface FormData {
    email: string
    password: string
}

const SignInForm: React.FunctionComponent = () => {
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

    // const handleOnCompleted = (data: SignInData) => {
    //     console.log(data, client)
    // }
    //
    // const handleOnError = (error: any) => {
    //     console.log(error)
    // }

    const handleOnSubmit = async (
        e: FormEvent,
        signInUserMutation: LoginMutationFn
    ) => {
        e.preventDefault()
        const user = await signInUserMutation({
            variables: {
                email: form.email,
                password: form.password,
            },
        })
        console.log(user)
    }

    return (
        <LoginComponent>
            {(loginUserMutation, { error }: any) => (
                <form onSubmit={e => handleOnSubmit(e, loginUserMutation)}>
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
                    <Button default type="submit">
                        Sign in
                    </Button>
                </form>
            )}
        </LoginComponent>
    )
}

export default SignInForm

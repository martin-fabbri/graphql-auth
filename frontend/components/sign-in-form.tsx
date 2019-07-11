import React, { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
import styled from 'styled-components'
import { LoginComponent, LoginMutationFn } from '../generated/apollo-components'

interface FormData {
    email: string
    password: string
}

const FormContainer = styled.form`
    width: 400px;
`

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
                <FormContainer
                    onSubmit={e => handleOnSubmit(e, loginUserMutation)}
                >
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
                    <Button stretched primary type="submit">
                        Sign in
                    </Button>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </FormContainer>
            )}
        </LoginComponent>
    )
}

export default SignInForm

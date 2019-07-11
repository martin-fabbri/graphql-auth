import React from 'react'
import { Field, Label } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'
import { Formik, Field as FormikField } from 'formik'
import InputField from './fields/input-field'
import {
    RegisterMutationComponent,
    RegisterMutationMutationFn,
} from '../generated/apollo-components'
// import { GraphQLError } from 'graphql'

interface FormData {
    firstName: string
    lastName: string
    email: string
    password: string
}

const ROOT_ERROR = 0

const initialValues: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

type SetErrorFn = (e: any) => void
type SetSubmittingFn = (flag: boolean) => void
type SetStatusFn = (status?: any) => void

const getErrorMsg = (validationError: any) => {
    return Object.values(validationError.constraints).reduce<string>(
        (concatErrors, msg: any) =>
            concatErrors.length > 0 ? `${concatErrors}, ${msg}` : msg,
        ''
    )
}

const handleOnSubmit = async (
    formValues: FormData,
    setErrors: SetErrorFn,
    registerMutation: RegisterMutationMutationFn,
    setSubmitting: SetSubmittingFn,
    setStatus: SetStatusFn
) => {
    try {
        console.log('values', formValues)
        const registeredUser = await registerMutation({
            variables: {
                data: {
                    ...formValues,
                },
            },
        })
        setSubmitting(false)
        console.log('Registered User', registeredUser)
    } catch (error) {
        if (error && error.graphQLErrors && error.graphQLErrors.length > 0) {
            const extensions = error.graphQLErrors[ROOT_ERROR].extensions
            console.log('extensions', extensions)
            const exception = extensions['exception']
            const validationErrors = exception['validationErrors']
            const errors = validationErrors
                ? validationErrors.reduce(
                      (detectedErrors: {}, validationError: any) => {
                          const errorMsg = getErrorMsg(validationError)
                          return {
                              ...detectedErrors,
                              [validationError.property]: errorMsg,
                          }
                      },
                      {}
                  )
                : {}
            const status = !validationErrors
                ? { msg: exception.message }
                : undefined

            setSubmitting(false)
            setErrors(errors)
            setStatus(status)
            console.log('errors', errors)
        }
    }
}

const RegisterForm: React.FunctionComponent = () => {
    return (
        <RegisterMutationComponent>
            {registerMutation => (
                <Formik
                    initialValues={initialValues}
                    onSubmit={(
                        formValues: FormData,
                        { setErrors, setSubmitting, setStatus }
                    ) =>
                        handleOnSubmit(
                            formValues,
                            setErrors,
                            registerMutation,
                            setSubmitting,
                            setStatus
                        )
                    }
                >
                    {({ handleSubmit, status }) => (
                        <form onSubmit={handleSubmit}>
                            {status && status.msg && <div>{status.msg}</div>}
                            <Field>
                                <Label>First Name</Label>
                                <FormikField
                                    id="fistName"
                                    name="firstName"
                                    placeholder="First Name"
                                    component={InputField}
                                />
                            </Field>
                            <Field>
                                <Label>Last Name</Label>
                                <FormikField
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    component={InputField}
                                />
                            </Field>
                            <Field>
                                <Label>Email</Label>
                                <FormikField
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    component={InputField}
                                />
                            </Field>
                            <Field>
                                <Label>Password</Label>
                                <FormikField
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    component={InputField}
                                />
                            </Field>
                            <Button primary stretched default type="submit">
                                Register
                            </Button>
                        </form>
                    )}
                </Formik>
            )}
        </RegisterMutationComponent>
    )
}

export default RegisterForm

import React from 'react'
import { Input, Message } from '@zendeskgarden/react-forms'
import { FieldProps } from 'formik'

const InputField = ({
    field,
    form: { errors, touched },
    ...props
}: FieldProps) => {
    const hasErrors =
        (touched[field.name] || false) && (errors[field.name] || false)
    return (
        <>
            <Input {...field} {...props} />
            {hasErrors && (
                <Message validation="error">{errors[field.name]}</Message>
            )}
        </>
    )
}

export default InputField

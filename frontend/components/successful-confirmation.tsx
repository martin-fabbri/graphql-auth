import { Button } from '@zendeskgarden/react-buttons'
import * as React from 'react'

class SuccessfulConfirmation extends React.Component {
    render() {
        console.log(SuccessfulConfirmation, this.props)
        return (
            <>
                <p>Your account was confirmed...</p>
                <Button muted>Login</Button>
            </>
        )
    }
}

export default SuccessfulConfirmation

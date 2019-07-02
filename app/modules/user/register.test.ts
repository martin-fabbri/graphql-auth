import { testConn } from '../../test-utils/test-conn'
import { Connection } from 'typeorm'
import { graphqlCall } from '../../test-utils/graphql-call'

const registerMutation = `
    mutation register($data: RegisterInput!) {
      register(data: $data) {
        id
        name
        email
      }
    }
`

let conn: Connection;

beforeAll(async () => {
    conn = await testConn()
})

afterAll(async ()=> {
    await conn.close()
})

describe('Register', () => {
    it ('create user', async () => {
        const user = await graphqlCall({
            source: registerMutation,
            variableValues: {
                data: {
                    firstName: 'Garfield',
                    lastName: 'Arbuckle',
                    email: 'garfield@arbuckle.com',
                    password: 'secret123',
                }
            }
        })

        console.log('User:', user)
    })
})
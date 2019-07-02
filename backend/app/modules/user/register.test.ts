import { testConn } from '../../test-utils/test-conn'
import { Connection } from 'typeorm'
import { graphqlCall } from '../../test-utils/graphql-call'
import faker from 'faker'
import { User } from '../../entity/user'

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
        const data = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        const response = await graphqlCall({
            source: registerMutation,
            variableValues: { data }
        })

        expect(response).toMatchObject({
            data: {
                register: {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email
                }
            }
        })

        const dbUser = await User.findOne({where: {email: data.email}})
        expect(dbUser).toMatchObject({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            confirmed: false
        })
    })
})
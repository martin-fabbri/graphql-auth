import { testConn } from '../../test-utils/test-conn'
import { Connection } from 'typeorm'

let conn: Connection;

beforeAll(async () => {
    conn = await testConn()
})

afterAll(async ()=> {
    await conn.close()
})

describe('Register', () => {
    it ('create user', () => {
        
    })
})
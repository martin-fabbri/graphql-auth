import { createConnection } from 'typeorm'
const config = require('../../ormconfig')

export const testConn = (drop = false) => createConnection({
    ...config,
    dropSchema: drop,
    synchronize: drop,
    logging: false,
    database: 'typegraphql-test',
    entities: [`${__dirname}/../entity/*.*`]
})

import { createConnection } from 'typeorm'
const config = require('../../ormconfig')

export const testConn = (drop = false) => createConnection({
    ...config,
    name: 'test',
    dropSchema: drop,
    synchronize: drop,
    logging: false,
    // database: 'test',
    entities: [`${__dirname}/../entity/*.*`]
})

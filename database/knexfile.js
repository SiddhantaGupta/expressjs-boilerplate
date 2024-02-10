import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(import.meta.dirname, '../.env'),
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
        stub: 'utilities/stub.js',
    },
};

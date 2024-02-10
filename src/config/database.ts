import postgres from 'postgres';
import config from '@config/config.js';

const sql = postgres({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
});

export default sql;

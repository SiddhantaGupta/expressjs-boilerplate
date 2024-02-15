import { Queue, Worker } from 'bullmq';
import config from '@config/config.js';

// Make sure that your redis instance has the setting
// maxmemory-policy=noeviction
// in order to avoid automatic removal of keys which would cause unexpected errors in BullMQ

const connection = {
    host: config.redis.host,
    port: config.redis.port,
};

const myQueue = new Queue('myqueue', { connection });

const myWorker = new Worker('myqueue', async (job) => {}, { connection });

export default myQueue;

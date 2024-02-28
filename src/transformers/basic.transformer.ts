import { BasicDatabaseObject } from '@app-types/database/index.js';

export default async function basicTransformer<T extends BasicDatabaseObject>(source: T) {
    let t: Partial<T> = source;
    return t;
}

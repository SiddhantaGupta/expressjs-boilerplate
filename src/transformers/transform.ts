import { BasicDatabaseObject } from '@app-types/database/index.js';
import basicTransformer from '@transformers/basic.transformer.js';

export default async function transform<T extends BasicDatabaseObject>(
    data: T | T[],
    transformer: Function | null = null,
) {
    let transform: Partial<T> | Partial<T>[] | null = null;
    if (Array.isArray(data) && data.length > 0) {
        transform = [];
        for (let index = 0; index < data.length; index++) {
            const source = data[index];
            let t = await basicTransformer<T>(source);
            if (transformer) {
                t = await transformer(t);
            }
            transform.push(t);
        }
    } else if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        transform = {};
        const source = data;
        let t = await basicTransformer<T>(source);
        if (transformer) {
            t = await transformer(t);
        }
        transform = t;
    }
    return transform;
}

import { User } from '@database/repositories/user.repository.js';

export default async function userTransformer(source: User) {
    let t: Partial<User> = source;
    delete t.password;
    delete t.is_deleted;
    return t;
}

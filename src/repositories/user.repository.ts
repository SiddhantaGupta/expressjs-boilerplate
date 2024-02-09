import { RegisterationSchema } from '@validations/auth.validation.js';

class UserRepository {
    constructor() {}

    async insert(body: RegisterationSchema) {
        return body;
    }

    async findByUsername(username: string) {
        return {
            username: username,
            password: '12345678',
        };
    }
}

const userRepository = new UserRepository();

export default userRepository;

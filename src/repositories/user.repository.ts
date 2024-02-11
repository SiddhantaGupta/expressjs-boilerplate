import { RegisterationSchema } from '@/validations/schemas/auth.validation.js';
import sql from '@config/database.js';

export type User = {
    id: string;
    uuid: string;
    email: string;
    password: string;
    role: number;
    first_name: string;
    last_name: string;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
};

class UserRepository {
    constructor() {}

    async insert(body: RegisterationSchema): Promise<User[]> {
        return await sql<User[]>`INSERT INTO users (email, password, role, first_name, last_name)
        VALUES (${body.email}, ${body.password}, ${body.role}, ${body.firstName}, ${body.lastName})
        RETURNING *`;
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

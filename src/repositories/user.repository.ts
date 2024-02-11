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

async function insert(body: RegisterationSchema): Promise<User> {
    return (
        await sql<User[]>`INSERT INTO users (email, password, role, first_name, last_name)
        VALUES (${body.email}, ${body.password}, ${body.role}, ${body.firstName}, ${body.lastName})
        RETURNING *`
    )[0];
}

async function findByEmail(email: string): Promise<User> {
    return (await sql<User[]>`SELECT * FROM users WHERE email=${email}`)[0];
}

async function findByUuid(uuid: string): Promise<User> {
    return (await sql<User[]>`SELECT * FROM users WHERE uuid=${uuid}`)[0];
}

export { insert, findByEmail, findByUuid };

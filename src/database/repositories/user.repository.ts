import { RegisterationSchema } from '@validations/schemas/auth.validation.js';
import sql from '@config/database.js';
import { ulid } from 'ulid';

export type User = {
    id: string;
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
        await sql<User[]>`INSERT INTO users (id, email, password, role, first_name, last_name)
        VALUES (${ulid()}, ${body.email}, ${body.password}, ${body.role}, ${body.firstName}, ${
            body.lastName
        })
        RETURNING *`
    )[0];
}

async function findByEmail(email: string): Promise<User> {
    return (await sql<User[]>`SELECT * FROM users WHERE email=${email}`)[0];
}

async function findById(id: string): Promise<User> {
    return (await sql<User[]>`SELECT * FROM users WHERE id=${id}`)[0];
}

export { insert, findByEmail, findById };

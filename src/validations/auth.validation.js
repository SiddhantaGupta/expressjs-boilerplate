import z from 'zod';

const registerationSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export { registerationSchema, loginSchema };

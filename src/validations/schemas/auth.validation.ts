import z from 'zod';

/**
 * @openapi
 *  components:
 *      schemas:
 *          CreateUserInput:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                      default: john.smith@example.com
 *                  password:
 *                      type: string
 *                      default: Password@123
 *          CreateUserResponse:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 */
const registerationSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export type RegisterationSchema = z.infer<typeof registerationSchema>;

export { registerationSchema, loginSchema };

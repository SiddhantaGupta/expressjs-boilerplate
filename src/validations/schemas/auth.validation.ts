import z from 'zod';

/**
 * @openapi
 *  components:
 *      schemas:
 *          CreateUserInput:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *                  - role
 *                  - firstName
 *                  - lastName
 *              properties:
 *                  email:
 *                      type: string
 *                      default: john.smith@example.com
 *                  password:
 *                      type: string
 *                      default: Password@123
 *                  role:
 *                      type: number
 *                      default: 1
 *                  firstName:
 *                      type: string
 *                      default: John
 *                  lastName:
 *                      type: string
 *                      default: Smith
 *          CreateUserResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  email:
 *                      type: string
 *                  role:
 *                      type: number
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  created_at:
 *                      type: string
 *                  updated_at:
 *                      type: string
 */
const registerationSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(8),
    role: z.number(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(8),
});

export type RegisterationSchema = z.infer<typeof registerationSchema>;

export { registerationSchema, loginSchema };

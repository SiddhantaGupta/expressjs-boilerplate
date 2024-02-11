import { RegisterationSchema } from '@validations/schemas/auth.validation.js';
import users from '@repositories/user.repository.js';
import bcrypt from 'bcrypt';
import globals from '@globals/globals.js';

const register = async (registerBody: RegisterationSchema) => {
    registerBody.password = await bcrypt.hash(registerBody.password, globals.bcryptSaltRounds);
    return (await users.insert(registerBody))[0];
};

const login = async (username: string, password: string) => {
    return await users.findByUsername(username);
};

export default { login, register };

import users from '@repositories/user.repository.js';

const register = async (username: string, password: string) => {
    return await users.insert({ username, password });
};

const login = async (username: string, password: string) => {
    return await users.findByUsername(username);
};

export default { login, register };

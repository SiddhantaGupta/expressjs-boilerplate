import users from '../../repositories/user.repository.js';

const register = async (username, password) => {
    return await users.insert({ username, password });
};

const login = async (username, password) => {
    return await users.findByUsername(username);
};

export default { login, register };

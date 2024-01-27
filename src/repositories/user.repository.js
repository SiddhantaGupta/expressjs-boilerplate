class UserRepository {
    constructor() {}

    async insert(body) {
        return body;
    }
    async findByUsername(username) {
        return {
            username: username,
            password: '12345678',
        };
    }
}

const userRepository = new UserRepository();

export default userRepository;

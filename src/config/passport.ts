import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifyCallback } from 'passport-jwt';
import config from '@config/config.js';
import users from '@repositories/user.repository.js';

const jwtOptions: StrategyOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
    try {
        const user = await users.findByUuid(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };

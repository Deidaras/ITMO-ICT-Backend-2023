import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user.service'
import dotenv from "dotenv"

dotenv.config()

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${process.env.ACCESS_TOKEN_LIFETIME}ms`
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
    const userService = new UserService()
    const user = await userService.getById(jwt_payload.id)
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)
export { opts as jwtOptions }

export default passport
import passport from "passport";
import passportJWT from "passport-jwt";
import local from 'passport-local';
import { auth } from "../middlewares/auth.js";
import UserManager from "../dao/usersManager.js";
import hash from "../services/hash.js";


// Estrategia local = registro y login 
const LocalStrategy = local.Strategy; // local = username + password

const usersServices = new UserManager();

const buscarToken = req => {
    let token = null

    if (req.cookies.cookieToken) token = req.cookies.cookieToken

    return token
}

const initializeStrategies = () => {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {

        const { first_name, last_name, age } = req.body;
        if (!first_name || !last_name || !age) return done(null, false, { message: "Valores incompletos" })

        const hasedPassword = await hash.createHash(password);
        const newUser = { first_name, last_name, email, age, password: hasedPassword }
        const result = await usersServices.create(newUser);

        done(null, result);

    }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        if (!email || !password) return done(null, false, { message: "Valores incompletos" });

        const user = await usersServices.getBy({ email });
        if (!user) return done(null, false, { message: "Credenciales Incorrectas" });
        const isValidPassword = await hash.validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: "Credenciales Incorrectas" });

        done(null, user);

    }))

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: process.env.SECRET,
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async (contenidoToken, done) => {
            try {
                // return done(null, false)   // fallo en la validacion
                return done(null, contenidoToken)  // todo OK
            } catch (error) {
                return done(error)  // error
            }
        }
    )
    )

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersServices.getBy({ _id: id });
        done(null, user);
    })


}

export default initializeStrategies;
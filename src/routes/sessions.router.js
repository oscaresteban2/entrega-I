import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import UserManager from "../dao/usersManager.js";
import auth from "../services/hash.js";

const router = Router();
const usersServices = new UserManager();


// EndPoint para crear un usuario y almacenarlo en la Base de Datos
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/authFail', failureMessage: true }), async (req, res) => {
    res.status(200).send({ status: "success", message: "Usuario registrado correctamente", payload: req.user._id });
})

router.get('/current', passport.authenticate("current", { session: false, failureRedirect: "/api/sessions/authFail", failureMessage: true }), async (req, res) => {

    // passport deja siempre que authenticate sale OK
    // una propery user en la req... req.user

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.name, datosUsuario: req.user
    });
}
);

router.post('/login', passport.authenticate("login", { failureRedirect: '/api/sessions/authFail', failureMessage: true }), async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });

    const user = await usersServices.getBy({ email });
    if (!user) return res.status(400).send({ status: "error", error: "Credenciales Incorrectas" });
    const isValidPassword = await auth.validatePassword(password, user.password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Credenciales Incorrectas" });
    //si se logueo bien, AHORA LE CREO UN TOKEN
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.first_name },
        process.env.SECRET,
        { expiresIn: '1h' });

    res.cookie("cookieToken", token, { httpOnly: true })
    // console.log(token);
    res.send({ status: "success", token })
    // token
})

//EndPoint para redirigis cualquier error del proceso de autenticacion
router.get('/authFail', (req, res) => {
    res.status(401).send({ status: "error", error: "Error de autenticacion" })
})

// EndPoint para Finalizar la session
router.get('/logout', async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
        }
        return res.redirect('/');
    });
})



export default router;
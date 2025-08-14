import express from 'express'; // creando la aplicacion de Express
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import session from 'express-session';
import connectionMongo from "./config/db.js";

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from "./routes/sessions.router.js";
import http from "http";
import dotenv from "dotenv";
import passport from "passport";
import initializeStrategies from "./config/passport.config.js";
import MongoStore from 'connect-mongo';

//inicializamos las variables de entorno
dotenv.config();


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

connectionMongo();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser("CRYPTO")); 
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://oscar:1234@cluster0.cscud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    ttl: 900
  }),
  secret: 'coderS3cret',
  resave: true,
  saveUninitialized: false
}))

initializeStrategies();
app.use(passport.initialize());

//Motores de plantillas y visualizaciones:
app.engine("handlebars", handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set("view engine", "handlebars");

//Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/", viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionRouter);

//Esucha el server:
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);  //Se llama la Variable del puerto al que se va a escuchar la conexion
});
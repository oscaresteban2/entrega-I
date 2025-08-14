import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const connectionMongo = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB, {
            dbName: 'Products' // Nombre de la base de datos
        });
        console.log("Conectado con MongoDB!");
    } catch (error) {
        // Manejo de errores en caso de fallo en la conexión
        console.error(`Error al conectarse a la base de datos: ${error.message}`);
    }
};

export default connectionMongo;
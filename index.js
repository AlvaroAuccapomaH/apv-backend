import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import pacienteRoutes from "./routes/pacienteRoutes.js"

const app = express();
app.use(express.json())
dotenv.config()
conectarDB()

const dominiosPermitidos = ['http://127.0.0.1:5173', 'http://localhost:5173', "http://localhost:3000", "http://localhost:5173"]
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //el origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor Funcionando en el puerto ${PORT}`);
})
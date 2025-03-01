import { UserModel } from "../models/turso/userStatics.js";
import { validRegisterUser } from "../schema/userSchema.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
        const result = validRegisterUser(req.body);

        if (!result || !result.data) {
            console.warn("⚠️ Datos de registro inválidos");
            return res.status(400).json({ error: "Datos de registro inválidos" });
        }

        const userValid = await UserModel.registerUser({ input: result.data });

        if (!userValid || userValid.length === 0) {
            console.warn("⚠️ Error al registrar el usuario");
            return res.status(400).json({ error: "Error al registrar el usuario" });
        }

        const { username, nombre, apellido, id, posicion, categoria ,email } = userValid[0];
        const token = jwt.sign({ id, username }, SECRET_KEY, {
            expiresIn: 60 * 60
        });

        res.status(200).json({ email, token, id , apellido ,nombre, username , posicion, categoria });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error en el servidor", message: error.message });
    }
}
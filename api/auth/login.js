import { validUser } from '../schema/userSchema.js';
/*
import { UserModel } from '../models/turso/userStatics.js';
import jwt from 'jsonwebtoken'; */

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
      const { email, password } = req.body;
      const result = validUser({ email, password });
     res.status(200).json({ message: 'Estadísticas de baloncesto', result });
    } catch (error) {
      return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
      
    }
/*    try {
        const { email, password } = req.body;
        const result = validUser({ email, password });
        const userValid = await UserModel.login({ input: result.data });
        if (!userValid) {
            console.warn("⚠️ Credenciales incorrectas");
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        const { email: userEmail, id } = userValid;
        const token = jwt.sign({ id, email: userEmail }, SECRET_KEY, {
            expiresIn: '2 days'
        });
        return res.json({ email: userEmail, token, id });
    } catch (error) {
        return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
    } */
}
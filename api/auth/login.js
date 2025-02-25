import { UserModel } from '../models/turso/users.js';
import { validUser } from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
      }
    try {
      const result = validUser(req.body);
      const userValid = await UserModel.login({ input: result.data });
      if (!userValid) {
        console.warn("⚠️ Credenciales incorrectas");
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      const { email, id } = userValid;
      const token = jwt.sign({ id, email }, SECRET_KEY, {
        expiresIn: '2 days'
      });
      return res.json({ email, token, id });
    } catch (error) {
      return res.status(500).json({ errorServerless: `Error ${error.name}`, error : error.message });
      
    }
  
    
  } 
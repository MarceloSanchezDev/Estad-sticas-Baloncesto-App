import { validRegisterUser } from "../schema/userSchema.js";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
      }
      try {
        const result = validRegisterUser(req.body)
        res.status(200).json({ message: 'Estadísticas de baloncesto', result});
      } catch (error) {
        res.status(500).json({ error: "Error en el servidor", message: error.message });
      }
  
    
  } 
import { UserModel } from '../models/turso/userStatics.js';
export default async function handler(req, res){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
        const {position, username} = req.body;
        const result = await UserModel.newPosition({ input: {position, username} });
        return res.json({ mensaje: "Posición creada correctamente", result });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
    }
}
import { UserModel } from "../models/turso/userStatics";

export default async function handler(req, res){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
            const {categoria, username} = req.body;
            const result = await UserModel.newCategory({ input: {categoria, username} });
            return res.json({ mensaje: "Categoria creada correctamente", result });
        } catch (error) {
            console.error("Error en el servidor:", error);
            return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
        }
}
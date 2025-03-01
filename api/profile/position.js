import { UserModel } from '../models/turso/userStatics.js';
export default async function handler(req, res){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
        const {position, username} = req.body;
        const result = UserModel.newPosition({ position, username });
        return res.json({ mensaje: "Posición creada correctamente", result });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
    }
}
/*
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    try {
        const { email, password } = req.body;
        const result = validUser({ email, password });

        if (!result || !result.data) {
            console.warn("⚠️ Datos de usuario inválidos");
            return res.status(400).json({ error: "Datos de usuario inválidos" });
        }

        const userValid = await UserModel.login({ input: result.data });
        if (!userValid) {
            console.warn("⚠️ Credenciales incorrectas");
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const { email: userEmail, id, apellido ,nombre, username} = userValid;
        const token = jwt.sign({ id, email: userEmail }, SECRET_KEY, {
            expiresIn: '2 days'
        });

        return res.json({ email: userEmail, token, id , apellido ,nombre, username});
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ errorServerless: `Error ${error.name}`, error: error.message });
    }
*/
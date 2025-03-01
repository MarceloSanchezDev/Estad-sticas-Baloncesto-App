export default async function handler(req, res){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const {categoria} = req.body;
    return res.json({ categoria });
}
export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
      }
    const { email, username, name, lastname, password } = req.body;
  
    res.status(200).json({ message: 'Estadísticas de baloncesto', email, username, name, lastname, password});
  } 
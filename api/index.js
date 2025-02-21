export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acceso desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Manejo de preflight requests
      return;
    }
  
    res.status(200).json({ message: 'Estadísticas de baloncesto' });
  } 
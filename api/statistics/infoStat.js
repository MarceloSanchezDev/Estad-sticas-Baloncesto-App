import { StatisticsModel } from "../models/turso/userStatics.js";

export default async function handler(req, res) {
    try {
        const { statID } = req.query;
        
         const response = await StatisticsModel.getStatistics(statID);
         if (!response) {
             return res.status(404).json({ error: "Estadística no encontrada" });
         }

         return res.status(200).json(response);
        }
     catch (error) {
        console.log(error)
        return res.status(500).json({error : "Error"})
    }
}
import { StatisticsModel } from "../models/turso/userStatics.js";

export default async function handler(req, res) {
    try {
        const { statID } = req.query;
        /**
         const response = await StatisticsModel.getStatById(statID);
         if (!response) {
             return res.status(404).json({ error: "Estadística no encontrada" });
         }
         * 
         */
         return res.status(200).json({ id: statID, message: "Estadística encontrada" });
        }
     catch (error) {
        console.log(error)
        return res.status(500).json({error : "Error"})
    }
}
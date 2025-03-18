import { StatisticsModel } from "../models/turso/userStatics.js";

export default async function handler(req, res) {
    try {
        const {username}= req.body
       const  response = await StatisticsModel.getAllStatistics(username)
        if(!response){
            return res.status(400).json({error : "Error"})
        }
        return res.status(200).json({
            response
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : "Error"})
    }
}
import { UserModel } from "../models/turso/userStatics";

export default async function handler(req, res) {
    try {
        const {username}= req.body
       const  response = await UserModel.getAllStatistics(username)
        if(!response){
            return res.status(400).json({error : "Error"})
        }
        return res.status(200).json({
            response
            });
    } catch (error) {
        return res.status(500).json({error})
    }
}
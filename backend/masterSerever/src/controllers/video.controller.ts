import {Video} from '../models/videoModel';
import { Request,Response } from "express";

const getVideos =async (req: Request, res: Response): Promise<void> => {
    try{
        const videos = await Video.find().sort({createdAt:-1});
        res.status(200).json({data:videos});
    }catch(error){
        console.error("Error getting videos:", error);
        res.status(500).json({ message: "Failed to get videos", error });
    }
}

const getUserVideo =async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        
    }
}
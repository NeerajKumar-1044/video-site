import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import { UserResponce } from "../types/userTypes.dto.js";

// Extend Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: {
        _id: string;
    } // TODO: You can replace `any` with a proper user type if available
  }
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Extract the token from cookies or authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token and decode it
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT as string) as jwt.JwtPayload;

    // Find the user associated with the token
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyJWT middleware:", error);
    res.status(401).json({ message: "Unauthorized access" });
  }
};

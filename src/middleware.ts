import { JWT_PASSWORD } from './config';
import { Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";


export const UserMiddleware = (req:Request, res:Response, next:NextFunction) =>{
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string , JWT_PASSWORD);

    if(decoded){
        //@ts-ignore
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            error:"your are not logged in"
        })
    }


}
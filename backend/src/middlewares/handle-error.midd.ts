import BaseError from "@errors/base.error"
import { NextFunction, Response, Request } from "express";

export const handleErrorMiddleware = (error:BaseError,req:Request,res:Response,next:NextFunction) =>{
    const statusCode = error.statusCode
    const treeHoursToMilliseconds = 10800000
    const message = error.message || 'Internal server error'
    console.log(error);
    
    return res.status(error.statusCode).json({
        statusCode,
        message,
        timestamp: new Date(Date.now() - treeHoursToMilliseconds).toISOString()
    })
}

export default handleErrorMiddleware

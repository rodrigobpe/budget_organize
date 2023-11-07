import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class BadRequestError extends BaseError{
    constructor(public message:string){
        super(HttpStatus.BAD_REQUEST,message)
    }
}
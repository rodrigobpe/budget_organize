import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class UnprocessableEntityError extends BaseError {
    constructor(message:string) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message)
    }
}
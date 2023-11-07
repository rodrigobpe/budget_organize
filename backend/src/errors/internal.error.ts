import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class InternalError extends BaseError {
    constructor(public message: string) {
        super(HttpStatus.INTERNAL_SERVER, message)
    }
}
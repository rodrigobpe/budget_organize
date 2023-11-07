import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class UnauthorizedError extends BaseError {
    constructor(public message: string) {
        super(HttpStatus.UNAUTHORIZED, message)
    }
}
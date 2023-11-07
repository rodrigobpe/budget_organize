import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class NotFoundError extends BaseError {
    constructor(public message: string) {
        super(HttpStatus.NOT_FOUND, message)
    }
}
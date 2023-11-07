import BaseError from "@errors/base.error"
import HttpStatus from "@utils/http-status"

export default class InvalidBodyError extends BaseError {
    constructor() {
        super(HttpStatus.BAD_REQUEST, "Body inválido")
    }
}
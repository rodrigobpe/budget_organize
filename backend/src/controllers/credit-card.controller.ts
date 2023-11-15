import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import CreditCardService from "@services/credit-card.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class CreditCardController {
    constructor(private readonly creditCardService: CreditCardService) { }

    async handleCreateCreditCard({ req, res }: HandleRequest) {
        const { bank, invoice_due_date, name, limit }: CreateCreditCardDto = req.body
        const { user_id } = req.params
        if (!bank || !invoice_due_date || !name || !limit) throw new InvalidBodyError()

        const creditCard = await this.creditCardService.createCreditCard({ bank, invoice_due_date, name, user_id, limit })
        return new HandleResponse(HttpStatus.CREATED, "Cartão de crédito criado", creditCard).execute(res)
    }

    async handleGetAllCreditCards({ req, res }: HandleRequest) {
        const creditCards = await this.creditCardService.getAllCreditCards()
        return new HandleResponse(HttpStatus.OK, undefined, creditCards).execute(res)
    }

    async handleDeleteCreditCard({ req, res }: HandleRequest) {
        const { id } = req.params
        await this.creditCardService.deleteCreditCard({credit_card_id:parseInt(id)})
        return new HandleResponse(HttpStatus.CREATED,"Cartão de crédito deletado").execute(res)
    }

}
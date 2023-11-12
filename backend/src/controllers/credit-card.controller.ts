import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import CreditCardService from "@services/credit-card.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class CreditCardController {
    constructor(private readonly creditCardService: CreditCardService) { }

    async handleCreateCreditCard({ req, res }: HandleRequest) {
        const { bank, invoice_due_date, name }: CreateCreditCardDto = req.body
        const { user_id } = req.params
        if (!bank || !invoice_due_date || !name) throw new InvalidBodyError()

        const creditCard = await this.creditCardService.createCreditCard({bank,invoice_due_date,name,user_id})
        return new HandleResponse(HttpStatus.CREATED,"Cartão de crédito criado",creditCard)
    }
}
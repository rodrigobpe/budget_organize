import CreditCard from "@entities/credit-card";
import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";
import CreditCardRepo from "./CreditCardRepo";
import prisma from "@database/index";
import DeleteCreditCardDto from "@entities/credit-card/dto/delete-credit-card.dto";

export default class PrismaCreditCardRepo implements CreditCardRepo {
    async create({ bank, invoice_due_date, name, user_id }: CreateCreditCardDto): Promise<CreditCard> {
        return prisma.creditCard.create({
            data: { bank, invoice_due_date, name, user_id }
        })
    }
    async getAll(): Promise<CreditCard[]> {
        return prisma.creditCard.findMany()
    }
    async getById({ credit_card_id }: {credit_card_id:number}): Promise<CreditCard> {
        return prisma.creditCard.findFirst({ where: { credit_card_id } })
    }

    async delete({ credit_card_id }: DeleteCreditCardDto): Promise<void> {
        await prisma.creditCard.delete({ where: { credit_card_id } })
    }

}
import PrismaCreditCardRepo from "@repositories/credit-card/prisma-credit-card.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";

export default class CreditCardService{
    constructor(
        private readonly prismaUserRepo:PrismaUserRepo,
        private readonly prismaCreditCardRepo:PrismaCreditCardRepo,      
    ){}
}
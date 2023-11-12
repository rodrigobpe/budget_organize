import CreditCard from "@entities/credit-card";
import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";
import NotFoundError from "@errors/not-found.error";
import PrismaCreditCardRepo from "@repositories/credit-card/prisma-credit-card.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";

export default class CreditCardService{
    constructor(
        private readonly prismaUserRepo:PrismaUserRepo,
        private readonly prismaCreditCardRepo:PrismaCreditCardRepo,      
    ){}

    async createCreditCard({bank,invoice_due_date,name,user_id}:CreateCreditCardDto):Promise<CreditCard>{
        const user = await this.prismaUserRepo.getById({user_id});
        if(!user) throw new NotFoundError('Usuário não encontrado')
        return await this.prismaCreditCardRepo.create({bank,invoice_due_date,name,user_id})
    }

    async getAllCreditCards():Promise<CreditCard[]>{
        const creditCards = await this.prismaCreditCardRepo.getAll()
        if(creditCards.length === 0)throw new NotFoundError("Nenhum cartão de crédito cadastrado")
        return creditCards
    }
}
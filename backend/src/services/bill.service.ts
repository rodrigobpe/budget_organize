import Bill from "@entities/bill";
import CreateBillDto from "@entities/bill/dto/create-bill.dto";
import NotFoundError from "@errors/not-found.error";
import PrismaBillRepo from "@repositories/bill/prisma-bill-repo";
import PrismaCategoryRepo from "@repositories/category/prisma-category.repo";
import PrismaCreditCardRepo from "@repositories/credit-card/prisma-credit-card.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";

export default class BillService {
    constructor(
        private readonly prismaBillRepo: PrismaBillRepo,
        private readonly prismaUserRepo: PrismaUserRepo,
        private readonly prismaCategoryRepo: PrismaCategoryRepo,
        private readonly prismaCreditCardRepo: PrismaCreditCardRepo
    ) { }

    async createBill({category_id,credit_card_id,price,title,user_id}:CreateBillDto):Promise<Bill>{
        const userExists = await this.prismaUserRepo.getById({user_id})
        const categoryExists = await this.prismaCategoryRepo.getById({category_id})
        const creditCardExists = await this.prismaCreditCardRepo.getById({credit_card_id})
        if(!userExists)throw new NotFoundError('Usuário não encontrado')
        if(!categoryExists)throw new NotFoundError('Categoria não encontrada')
        if(!creditCardExists)throw new NotFoundError('Cartão de credito não encontrado')

        return await this.prismaBillRepo.create({category_id,credit_card_id,price,title,user_id})
    }
}
import NotFoundError from "@errors/not-found.error";
import Balance from "@entities/Balance";
import PrismaBalanceRepo from "@repositories/balance/prisma-balance.repo";
import CreateBalanceDto from "@entities/balance/dto/create-balance.dto";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import DeleteBalanceDto from "@entities/balance/dto/delete-balance.dto";

export default class BalanceService {
    constructor(
        private readonly prismaBalanceRepo: PrismaBalanceRepo,
        private readonly prismaUserRepo: PrismaUserRepo) 
        { }

    async createBalance({ amount, strategy, user_id }: CreateBalanceDto): Promise<Balance> {
        const user = await this.prismaUserRepo.getById({user_id})        
        if(!user)throw new NotFoundError('Usuário não encontrado')
        return await this.prismaBalanceRepo.create({ amount, strategy, user_id })
    }

    async getAllBalances(): Promise<Balance[]> {
        const balances = await this.prismaBalanceRepo.getAll()
        if (balances.length === 0) throw new NotFoundError('Nenhum saldo encontrado')
        return balances
    }

    async deleteBalance({balance_id}:DeleteBalanceDto):Promise<void>{
        const balance = await this.prismaBalanceRepo.getById({balance_id})        
        if(!balance)throw new NotFoundError('Saldo não encontrado')
        return await this.prismaBalanceRepo.delete({balance_id})
    }

    // async updateBalance({Balance_id,name}:Balance):Promise<Balance>{
    //     const Balance = await this.prismaBalanceRepo.getById({Balance_id})
    //     if(!Balance)throw new NotFoundError('Categoria não encontrada')
    //     return await this.prismaBalanceRepo.update({name,Balance_id})
    // }
}
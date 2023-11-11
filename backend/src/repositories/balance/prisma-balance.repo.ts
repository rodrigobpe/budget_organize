import Balance from "@entities/balance";
import CreateBalanceDto from "@entities/balance/dto/create-balance.dto";
import BalanceRepo from "./balance.repo";
import prisma from "@database/index";
import utcBrazilMilliseconds from "@utils/utcBrazil";

export default class PrismaBalanceRepo implements BalanceRepo {
    async create({ amount, strategy, user_id }: CreateBalanceDto): Promise<Balance> {
        return await prisma.balance.create({
            data: {
                amount,
                strategy,
                user_id,
                created_at:new Date(Date.now() - utcBrazilMilliseconds).toISOString()
            }
        })
    }
    async getAll(): Promise<Balance[]> {
        return await prisma.balance.findMany()
    }
    async getById({ balance_id }: { balance_id: number; }): Promise<Balance> {
        return await prisma.balance.findFirst({
            where: { balance_id }
        })
    }

}
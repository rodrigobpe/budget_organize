import Budget from "@entities/budget";
import CreateBudgetDto from "@entities/budget/dto/create-budget.dto";
import BudgetRepo from "./budget.repo";
import prisma from "@database/index";
import utcBrazilMilliseconds from "@utils/utcBrazil";
import DeleteBudgetDto from "@entities/budget/dto/delete-budget.dto";

export default class PrismaBudgetRepo implements BudgetRepo {
    async delete({ budget_id }:DeleteBudgetDto): Promise<void> {
        await prisma.budget.delete({where:{budget_id}})
    }
    async create({ amount, strategy, user_id }: CreateBudgetDto): Promise<Budget> {
        return await prisma.budget.create({
            data: {
                amount,
                strategy,
                user_id,
                created_at:new Date(Date.now() - utcBrazilMilliseconds).toISOString()
            }
        })
    }
    async getAll(): Promise<Budget[]> {
        return await prisma.budget.findMany()
    }
    async getById({ budget_id }: { budget_id: number; }): Promise<Budget> {
        return await prisma.budget.findFirst({
            where: { budget_id }
        })
    }

}
import NotFoundError from "@errors/not-found.error";
import Budget from "@entities/Budget";
import PrismaBudgetRepo from "@repositories/budget/prisma-budget.repo";
import CreateBudgetDto from "@entities/Budget/dto/create-budget.dto";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import DeleteBudgetDto from "@entities/budget/dto/delete-budget.dto";

export default class BudgetService {
    constructor(
        private readonly prismaBudgetRepo: PrismaBudgetRepo,
        private readonly prismaUserRepo: PrismaUserRepo) 
        { }

    async createBudget({ amount, strategy, user_id }: CreateBudgetDto): Promise<Budget> {
        const user = await this.prismaUserRepo.getById({user_id})        
        if(!user)throw new NotFoundError('Usuário não encontrado')
        return await this.prismaBudgetRepo.create({ amount, strategy, user_id })
    }

    async getAllBudgets(): Promise<Budget[]> {
        const budgets = await this.prismaBudgetRepo.getAll()
        if (budgets.length === 0) throw new NotFoundError('Nenhum saldo encontrado')
        return budgets
    }

    async deleteBudget({budget_id}:DeleteBudgetDto):Promise<void>{
        const Budget = await this.prismaBudgetRepo.getById({budget_id})        
        if(!Budget)throw new NotFoundError('Saldo não encontrado')
        return await this.prismaBudgetRepo.delete({budget_id})
    }

    // async updateBudget({Budget_id,name}:Budget):Promise<Budget>{
    //     const Budget = await this.prismaBudgetRepo.getById({Budget_id})
    //     if(!Budget)throw new NotFoundError('Categoria não encontrada')
    //     return await this.prismaBudgetRepo.update({name,Budget_id})
    // }
}
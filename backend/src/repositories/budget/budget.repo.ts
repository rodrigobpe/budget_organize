import Budget from "@entities/budget";
import CreateBudgetDto from "@entities/budget/dto/create-budget.dto";
import DeleteBudgetDto from "@entities/budget/dto/delete-budget.dto";

export default abstract class BudgetRepo{
    abstract create({amount,strategy,user_id}:CreateBudgetDto):Promise<Budget>
    abstract getAll():Promise<Budget[] | null>
    // abstract update({category_id,name}:Budget):Promise<Budget>
    abstract getById({budget_id}:{budget_id:number}):Promise<Budget | null>
    abstract delete({budget_id}:DeleteBudgetDto):Promise<void>
}
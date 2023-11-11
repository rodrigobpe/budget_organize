import CreateBudgetDto from "@entities/budget/dto/create-budget.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import BudgetService from "@services/budget.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class BudgetController {
    constructor(private readonly BudgetService: BudgetService) { }

    async handleCreateBudget({ req, res }: HandleRequest) {      
        const { amount, strategy }: CreateBudgetDto = req.body
        const { id } = req.params
        if (!amount || !strategy) throw new InvalidBodyError();

        const budget = await this.BudgetService.createBudget({ amount, strategy, user_id: id })
        return new HandleResponse(HttpStatus.CREATED, 'Saldo criado', budget).execute(res)
    }

    async handleGetAllBudgets({ req, res }: HandleRequest) {
        const budgets = await this.BudgetService.getAllBudgets()
        return new HandleResponse(HttpStatus.OK, undefined, budgets).execute(res)
    }

    async handleDeleteBudget({req,res}:HandleRequest){
        const {budget_id} = req.params
        await this.BudgetService.deleteBudget({budget_id:parseInt(budget_id)})
        return new HandleResponse(HttpStatus.NO_CONTENT, 'Saldo deletado').execute(res)
    }

//     async handleUpdateCategory({req,res}:HandleRequest){
//         const { id }  = req.params
//         const { name } = req.body
//         if (!name) throw new InvalidBodyError();
//         const categoryEdit = await this.categoryService.updateCategory({category_id:parseInt(id),name})
//         return new HandleResponse(HttpStatus.CREATED,undefined,categoryEdit).execute(res)
//     }
}
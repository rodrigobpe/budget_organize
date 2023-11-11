import CreateBalanceDto from "@entities/balance/dto/create-balance.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import BalanceService from "@services/balance.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class BalanceController {
    constructor(private readonly balanceService: BalanceService) { }

    async handleCreateBalance({ req, res }: HandleRequest) {      
        const { amount, strategy }: CreateBalanceDto = req.body
        const { id } = req.params
        if (!amount || !strategy) throw new InvalidBodyError();

        const category = await this.balanceService.createBalance({ amount, strategy, user_id: id })
        return new HandleResponse(HttpStatus.CREATED, 'Categoria criada', category).execute(res)
    }

    async handleGetAllBalances({ req, res }: HandleRequest) {
        const categories = await this.balanceService.getAllBalances()
        return new HandleResponse(HttpStatus.OK, undefined, categories).execute(res)
    }

//     async handleUpdateCategory({req,res}:HandleRequest){
//         const { id }  = req.params
//         const { name } = req.body
//         if (!name) throw new InvalidBodyError();
//         const categoryEdit = await this.categoryService.updateCategory({category_id:parseInt(id),name})
//         return new HandleResponse(HttpStatus.CREATED,undefined,categoryEdit).execute(res)
//     }
}
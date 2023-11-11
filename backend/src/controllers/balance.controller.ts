import CreateBalanceDto from "@entities/balance/dto/create-balance.dto";
import DeleteBalanceDto from "@entities/balance/dto/delete-balance.dto";
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
        return new HandleResponse(HttpStatus.CREATED, 'Saldo criado', category).execute(res)
    }

    async handleGetAllBalances({ req, res }: HandleRequest) {
        const categories = await this.balanceService.getAllBalances()
        return new HandleResponse(HttpStatus.OK, undefined, categories).execute(res)
    }

    async handleDeleteBalance({req,res}:HandleRequest){
        const {balance_id} = req.params
        await this.balanceService.deleteBalance({balance_id:parseInt(balance_id)})
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
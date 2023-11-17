import CreateBillDto from "@entities/bill/dto/create-bill.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import BillService from "@services/bill.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export class BillController {
    constructor(private readonly billService: BillService) { }

    async handleCreateBill({ req, res }: HandleRequest) {
        const { category_id, credit_card_id, price, title }: CreateBillDto = req.body
        const { user_id } = req.params
        if (!category_id || !title || !credit_card_id || !price) throw new InvalidBodyError()
        const bill = await this.billService.createBill({category_id,credit_card_id,price,title,user_id})
        return new HandleResponse(HttpStatus.CREATED,"Despesa criada",bill).execute(res)
    }

    async handleGetBillById({req,res}:HandleRequest){
        const {id} = req.params
        const bill = await this.billService.getBillById({bill_id:parseInt(id)})
        return new HandleResponse(HttpStatus.OK,undefined,bill).execute(res)
    }
    
    async handleGetAllBillsByUser({req,res}:HandleRequest){
        const {user_id} = req
        const bills = await this.billService.getAllBillsByUser({user_id})
        return new HandleResponse(HttpStatus.OK,undefined,bills).execute(res)
    }
}
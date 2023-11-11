import Balance from "@entities/balance";
import CreateBalanceDto from "@entities/balance/dto/create-balance.dto";
import DeleteBalanceDto from "@entities/balance/dto/delete-balance.dto";

export default abstract class BalanceRepo{
    abstract create({amount,strategy,user_id}:CreateBalanceDto):Promise<Balance>
    abstract getAll():Promise<Balance[] | null>
    // abstract update({category_id,name}:Balance):Promise<Balance>
    abstract getById({balance_id}:{balance_id:number}):Promise<Balance | null>
    abstract delete({balance_id}:DeleteBalanceDto):Promise<void>
}
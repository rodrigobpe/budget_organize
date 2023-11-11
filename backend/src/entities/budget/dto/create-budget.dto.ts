import Strategy from "../enum";

export default class CreateBudgetDto{
    amount:number;
    strategy:Strategy;
    created_at?:Date
    user_id?:string
}
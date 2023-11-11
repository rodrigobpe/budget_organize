export default class Balance{
    balance_id:number;
    amount:number;
    strategy:Strategy;
    created_at:Date;
    user_id:string
}

enum Strategy{
    Daily,
    Weekly,
    Biweekly,
    Annual
}
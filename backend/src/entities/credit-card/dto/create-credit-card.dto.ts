export default class CreateCreditCardDto{
    name:string;
    invoice_due_date:Date;
    bank:string;
    limit:number
    user_id?:string;
}
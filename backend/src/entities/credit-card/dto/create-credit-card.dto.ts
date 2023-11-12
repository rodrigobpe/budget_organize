export default class CreateCreditCardDto{
    name:string;
    invoice_due_date:Date;
    bank:string;
    user_id?:string;
}
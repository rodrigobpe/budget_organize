export default class UpdateCreditCardDto{
    credit_card_id:number
    name?:string;
    invoice_due_date?:Date;
    bank?:string;
    limit?:number
}
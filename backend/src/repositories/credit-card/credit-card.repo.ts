import CreditCard from "@entities/credit-card";
import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";

export default abstract class CreditCardRepo{
    abstract create({bank,invoice_due_date,name,user_id}:CreateCreditCardDto):Promise<CreditCard>
    abstract getAll():Promise<Partial<CreditCard>[] | null>
    abstract getById({credit_card_id}:{credit_card_id:number}):Promise<CreditCard | null>
    abstract delete({credit_card_id}:{credit_card_id:number}):Promise<void>

    
}
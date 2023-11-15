import CreditCard from "@entities/credit-card";
import CreateCreditCardDto from "@entities/credit-card/dto/create-credit-card.dto";
import DeleteCreditCardDto from "@entities/credit-card/dto/delete-credit-card.dto";
import UpdateCreditCardDto from "@entities/credit-card/dto/update-credit-card.dto";


export default abstract class CreditCardRepo {
    abstract create({ bank, invoice_due_date, name,limit, user_id }: CreateCreditCardDto): Promise<CreditCard>;
    abstract getAll(): Promise<CreditCard[] | null>;
    abstract getById({ credit_card_id }: {credit_card_id:number}): Promise<CreditCard | null>;
    abstract delete({ credit_card_id }: DeleteCreditCardDto): Promise<void>;
    abstract update({credit_card_id,bank,invoice_due_date,limit,name}:UpdateCreditCardDto):Promise<CreditCard>
}

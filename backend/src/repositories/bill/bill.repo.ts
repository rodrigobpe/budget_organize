import Bill from "@entities/bill";
import CreateBillDto from "@entities/bill/dto/create-bill.dto";

export default abstract class BillRepo {
    abstract create({ category_id,credit_card_id,price,title,user_id }: CreateBillDto): Promise<Bill>;
    abstract getAll(): Promise<Bill[] | null>;
    abstract getById({ bill_id }: {bill_id:number}): Promise<Bill | null>;
}

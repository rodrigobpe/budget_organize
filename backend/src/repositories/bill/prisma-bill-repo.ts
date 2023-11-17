import Bill from "@entities/bill";
import CreateBillDto from "@entities/bill/dto/create-bill.dto";
import BillRepo from "./bill.repo";
import prisma from "@database/index";

export default class PrismaBillRepo implements BillRepo{
    async create({ category_id, credit_card_id, price, title, user_id }: CreateBillDto): Promise<Bill> {
        return await prisma.bill.create({
            data:{price,title,category_id,credit_card_id,user_id}
        })
    }
    async getAll(): Promise<Bill[]> {
        throw new Error("Method not implemented.");
    }
    async getById({ bill_id }: { bill_id: number; }): Promise<Bill> {
        throw new Error("Method not implemented.");
    }

}
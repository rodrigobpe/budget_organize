import Bill from "@entities/bill";
import CreateBillDto from "@entities/bill/dto/create-bill.dto";
import BillRepo from "./bill.repo";
import prisma from "@database/index";
import utcBrazilMilliseconds from "@utils/utcBrazil";

export default class PrismaBillRepo implements BillRepo {
    async create({ category_id, credit_card_id, price, title, user_id }: CreateBillDto): Promise<Bill> {
        return await prisma.bill.create({
            data: { price, title, category_id, credit_card_id, user_id, date: new Date(Date.now() - utcBrazilMilliseconds) }
        })
    }
    async getAllByUser({ user_id }: { user_id: string }): Promise<Bill[]> {
        return await prisma.bill.findMany({
            where: { user_id }
        })
    }
    async getById({ bill_id }: { bill_id: number; }): Promise<Bill> {
        return await prisma.bill.findFirst({ where: { bill_id } })
    }
    
    async delete({ bill_id }: { bill_id: number; }): Promise<void> {
        await prisma.bill.delete({
            where:{bill_id}
        })
    }
}
import User from "@entities/user";
import CreateUserDto from "@entities/user/dto/create-user.dto";
import UserRepo from "./user.repo";
import prisma from "@database/index";
import UpdateUserDTO from "@entities/user/dto/update-user.dto";

export default class PrismaUserRepo implements UserRepo {
    async getAll(): Promise<Partial<User>[]> {
        return await prisma.user.findMany({
            select: {
                user_id: true,
                email: true,
                is_budget_recurrent: true,
                name: true,
                budget: { select: { budget_id: true, amount: true, created_at: true, strategy: true } },
                bill: true,
                credit_card: {select: {credit_card_id:true,name:true,icon:true,invoice_due_date:true}},
            }
        })
    }
    async create({ email, name, password, is_budget_recurrent }: CreateUserDto): Promise<User> {
        return await prisma.user.create({
            data: {
                email, name, password, is_budget_recurrent
            }
        })
    }

    async getByEmail({ email }: { email: string; }): Promise<User> {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    async getById({ user_id }: { user_id: string; }): Promise<User> {
        return await prisma.user.findFirst({
            where: { user_id },
            include: {
                budget: true,
                bill: true,
                credit_card: true,
            }
        })
    }

    async delete({ user_id }: { user_id: string; }): Promise<void> {
        await prisma.user.delete({
            where: { user_id }
        })
    }

    async update({ user_id, is_budget_recurrent, name, password }: UpdateUserDTO): Promise<User> {
        return await prisma.user.update({
            data: {
                name,
                is_budget_recurrent,
                password
            },
            where: {
                user_id
            }
        })
    }

}
import User from "@entities/user";
import CreateUserDto from "@entities/user/dto/create-user.dto";
import UserRepo from "./user.repo";
import prisma from "@database/index";

export default class PrismaUserRepo implements UserRepo {
    async getAll(): Promise<Partial<User>[]> {
        return await prisma.user.findMany({
            select:{
                email:true,
                is_balance_recurrent:true,
                name:true,
                user_id:true,
                balance:true,
                bill:true
            }
        })
    }
    async create({ email, name, password }: CreateUserDto): Promise<User> {
        return await prisma.user.create({
            data: {
                email, name, password
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
            where: { user_id }
        })
    }

}
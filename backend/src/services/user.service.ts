import CreateUserDto from "@entities/user/dto/create-user.dto";
import NotFoundError from "@errors/not-found.error";
import UnprocessableEntityError from "@errors/unprocessable-entity.error";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import hashPassword from "@utils/hash-password";

export default class UserService{
    constructor(private readonly prismaUserRepo:PrismaUserRepo){}

    async createUser({email,name,password}:CreateUserDto){
        const userExists = await this.prismaUserRepo.getByEmail({email})
        if(userExists) throw new UnprocessableEntityError('Usuário já está cadastrado')
        return this.prismaUserRepo.create({email,name,password:hashPassword(password,10)})
    }

    async getUserById({user_id}:{user_id:string}){
        const user = await this.prismaUserRepo.getById({user_id})
        if(!user) throw new NotFoundError('Usuário não encontrado')
        return user
    }
}
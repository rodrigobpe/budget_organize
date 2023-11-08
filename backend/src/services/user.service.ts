import AuthResponseDto from "@entities/auth/dto/auth-response.dto";
import AuthDto from "@entities/auth/dto/auth.dto";
import CreateUserDto from "@entities/user/dto/create-user.dto";
import UpdateUserDTO from "@entities/user/dto/update-user.dto";
import NotFoundError from "@errors/not-found.error";
import UnprocessableEntityError from "@errors/unprocessable-entity.error";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import hashPassword from "@utils/hash-password";
import bcryot from "bcrypt";
import jwt from 'jsonwebtoken'

export default class UserService{
    constructor(private readonly prismaUserRepo:PrismaUserRepo){}

    async createUser({email,name,password}:CreateUserDto){
        const userExists = await this.prismaUserRepo.getByEmail({email})
        if(userExists) throw new UnprocessableEntityError('Usuário já está cadastrado')
        return this.prismaUserRepo.create({email,name,password:hashPassword(password,10),is_balance_recurrent:false})
    }

    async getUserById({user_id}:{user_id:string}){
        const user = await this.prismaUserRepo.getById({user_id})
        if(!user) throw new NotFoundError('Usuário não encontrado')
        return user
    }

    async getAllUsers(){
        const users = await this.prismaUserRepo.getAll()
        if(users.length === 0) throw new NotFoundError('Nenhum usuário encontrado')
        return users
    }

    async deleteUser({user_id}:{user_id:string}){
        const user = await this.prismaUserRepo.getById({user_id})
        if(!user) throw new NotFoundError('Usuário não encontrado')
        return await this.prismaUserRepo.delete({user_id})
    }

    async updateUser({user_id,is_balance_recurrent,name,password}:UpdateUserDTO){
        const userExists = await this.prismaUserRepo.getById({user_id})
        if(!userExists) throw new NotFoundError('Usuário não encontrado')
        return this.prismaUserRepo.update({user_id,name,password:hashPassword(password,10),is_balance_recurrent})
    }

    async auth({ email, password }: AuthDto) {
        const user = await this.prismaUserRepo.getByEmail({ email })
        if (!user) throw new NotFoundError("E-mail ou senha incorretos")

        const passwordMatch = bcryot.compareSync(password, user.password)
        if (!passwordMatch) throw new NotFoundError("E-mail ou senha incorretos")
        
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_TOKEN ?? "", {
            subject: user.user_id,
            expiresIn: '6h'
        })

        const tokenRes: AuthResponseDto = {
            user: {
                email: user.email,
                name: user.name
            }, token
        }

        return tokenRes
    }

}
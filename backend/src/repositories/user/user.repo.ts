import User from "@entities/user";
import CreateUserDto from "@entities/user/dto/create-user.dto";

export default abstract class UserRepo{
    abstract create({email,name,password}:CreateUserDto):Promise<User>
    abstract getAll():Promise<Partial<User>[] | null>
    abstract getById({user_id}:{user_id:string}):Promise<User | null>
    abstract getByEmail({email}:{email:string}):Promise<User | null>
}
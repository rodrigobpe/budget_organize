import User from "@entities/user";
import CreateUserDto from "@entities/user/dto/create-user.dto";
import UpdateUserDTO from "@entities/user/dto/update-user.dto";

export default abstract class UserRepo{
    abstract create({email,name,password,is_balance_recurrent}:CreateUserDto):Promise<User>
    abstract getAll():Promise<Partial<User>[] | null>
    abstract getById({user_id}:{user_id:string}):Promise<User | null>
    abstract getByEmail({email}:{email:string}):Promise<User | null>
    abstract delete({user_id}:{user_id:string}):Promise<void>
    abstract update({user_id,is_balance_recurrent,name,password}:UpdateUserDTO):Promise<User>
}
import { hashSync } from "bcrypt"

const hashPassword = (password:string, salt:number) =>{
    const hashed = hashSync(password,salt)
    return hashed
}

export default hashPassword
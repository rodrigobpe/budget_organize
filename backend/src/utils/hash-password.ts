import { hashSync } from "bcrypt"

const hashPassword = (password:string, salt:number) =>{
    if(!password || !salt) return
    const hashed = hashSync(password,salt)
    return hashed
}

export default hashPassword
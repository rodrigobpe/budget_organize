import Tag from "@entities/tag";
import CreateTagDto from "@entities/tag/dto/create-tag.dto";


export default abstract class TagRepo{
    abstract create({name}:CreateTagDto):Promise<Tag>
    // abstract getAll():Promise<Partial<Tag>[] | null>
    // abstract getById({user_id}:{user_id:string}):Promise<Tag | null>
    // abstract getByName({name}:{name:string}):Promise<Tag | null>
    // abstract delete({tag_id}:{tag_id:string}):Promise<void>
    // abstract update({Tag_id,is_balance_recurrent,name,password}:UpdateTagDTO):Promise<Tag>
}
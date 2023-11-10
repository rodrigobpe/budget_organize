import Category from "@entities/category";
import CreateCategoryDto from "@entities/category/dto/create-category.dto";

export default abstract class CategoryRepo{
    abstract create({name}:CreateCategoryDto):Promise<Category>
    abstract getAll():Promise<Partial<Category>[] | null>
    // abstract getById({category_id}:{category_id:number}):Promise<Category | null>
    // abstract delete({category_id}:{category_id:string}):Promise<void>
    // abstract update({category_id,is_balance_recurrent,name,password}:UpdateCategoryDTO):Promise<Category>
}
import Category from "@entities/category";
import CreateCategoryDto from "@entities/category/dto/create-category.dto";

export default abstract class CategoryRepo{
    abstract create({name}:CreateCategoryDto):Promise<Category>
    abstract getAll():Promise<Partial<Category>[] | null>
    abstract update({category_id,name}:Category):Promise<Category>
    // abstract getById({category_id}:{category_id:number}):Promise<Category | null>
    // abstract delete({category_id}:{category_id:string}):Promise<void>
}
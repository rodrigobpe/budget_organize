import CreateCategoryDto from "@entities/category/dto/create-category.dto";
import NotFoundError from "@errors/not-found.error";
import PrismaCategoryRepo from "@repositories/category/prisma-category.repo";

export default class CategoryService{
    constructor(private readonly prismaCategoryRepo:PrismaCategoryRepo){}

    async createCategory({name}:CreateCategoryDto){
        return await this.prismaCategoryRepo.create({name})
    }

    async getAllCategories(){
        const categories = await this.prismaCategoryRepo.getAll()
        if(categories.length === 0)throw new NotFoundError('Nenhuma categoria encontrada')
        return categories
    }
}
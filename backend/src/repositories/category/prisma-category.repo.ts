import Category from "@entities/category";
import CreateCategoryDto from "@entities/category/dto/create-category.dto";
import CategoryRepo from "./category.repo";
import prisma from "@database/index";

export default class PrismaCategoryRepo implements CategoryRepo {
    async create({ name }: CreateCategoryDto): Promise<Category> {
        return await prisma.category.create({
            data: {
                name
            }
        })
    }
    async getAll(): Promise<Partial<Category>[]> {
        return await prisma.category.findMany({ orderBy: { name: "asc" }})
    }
}
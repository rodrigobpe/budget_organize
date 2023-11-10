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
        return await prisma.category.findMany({ orderBy: { name: "asc" } })
    }

    async update({ category_id, name }: Category): Promise<Category> {
        return await prisma.category.update({
            data: { name },
            where: { category_id }
        })
    }

    async getById({ category_id }: { category_id: number; }): Promise<Category> {
        return await prisma.category.findFirst({ where: { category_id } })
    }
}
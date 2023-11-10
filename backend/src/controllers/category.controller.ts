import CreateCategoryDto from "@entities/category/dto/create-category.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import CategoryService from "@services/category.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    async handleCreateCategory({ req, res }: HandleRequest) {
        const { name }: CreateCategoryDto = req.body
        if (!name) throw new InvalidBodyError();

        const category = await this.categoryService.createCategory({name})
        return new HandleResponse(HttpStatus.CREATED, 'Categoria criada', category).execute(res)
    }

    async handleGetAllCategories({req,res}:HandleRequest){
        const categories = await this.categoryService.getAllCategories()
        return new HandleResponse(HttpStatus.OK,undefined,categories).execute(res)
    }

    async handleUpdateCategory({req,res}:HandleRequest){
        const { id }  = req.params
        const { name } = req.body
        if (!name) throw new InvalidBodyError();
        const categoryEdit = await this.categoryService.updateCategory({category_id:parseInt(id),name})
        return new HandleResponse(HttpStatus.CREATED,undefined,categoryEdit).execute(res)
    }
}
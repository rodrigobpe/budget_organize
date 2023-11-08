import CreateUserDto from "@entities/user/dto/create-user.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import UserService from "@services/user.service";
import HandleRequest from "@utils/handle-request";
import HttpStatus from "@utils/http-status";

export default class UserController {
    constructor(private readonly userService: UserService) { }

    async handleCreateUser({ req, res }: HandleRequest) {
        const { email, name, password }: CreateUserDto = req.body
        if (!email || !name || !password) throw new InvalidBodyError();
        const userRes = await this.userService.createUser({ email, name, password })
        const { password: _, ...user } = userRes
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Usuário criado',
            user
        })
    }

    async handleGetUserById({ req, res }: HandleRequest) {
        const { id } = req.params
        const userRes = await this.userService.getUserById({ user_id: id })
        const { password: _, ...user } = userRes
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            user
        })
    }

    async handleGetAllUsers({ req, res }: HandleRequest) {
        const users = await this.userService.getAllUsers()
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            users
        })
    }

    async handleDeleteUser({ req, res }: HandleRequest) {
        const { id } = req.params
        await this.userService.deleteUser({ user_id: id })
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message:'Usuário deletado'
        })
    }
}
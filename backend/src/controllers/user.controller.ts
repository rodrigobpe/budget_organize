import CreateUserDto from "@entities/user/dto/create-user.dto";
import InvalidBodyError from "@errors/invalid-body.error";
import UserService from "@services/user.service";
import HandleRequest from "@utils/handle-request";
import HandleResponse from "@utils/handle-response";
import HttpStatus from "@utils/http-status";

export default class UserController {
    constructor(private readonly userService: UserService) { }

    async handleCreateUser({ req, res }: HandleRequest) {
        const { email, name, password }: CreateUserDto = req.body
        if (!email || !name || !password) throw new InvalidBodyError();
        const userRes = await this.userService.createUser({ email, name, password })
        const { password: _, ...user } = userRes
        return new HandleResponse(HttpStatus.CREATED, 'Usuário criado', user).execute(res)
    }

    async handleGetUserById({ req, res }: HandleRequest) {
        const { id } = req.params
        const userRes = await this.userService.getUserById({ user_id: id })
        const { password: _, ...user } = userRes
        return new HandleResponse(HttpStatus.OK, undefined, user).execute(res)
    }

    async handleGetAllUsers({ req, res }: HandleRequest) {
        const users = await this.userService.getAllUsers()
        return new HandleResponse(HttpStatus.OK, undefined, users).execute(res)
    }

    async handleDeleteUser({ req, res }: HandleRequest) {
        const { id } = req.params
        await this.userService.deleteUser({ user_id: id })
        return new HandleResponse(HttpStatus.NO_CONTENT, `Usuário deletado`).execute(res)
    }

    async handleUpdateUser({ req, res }: HandleRequest) {
        const { id } = req.params
        const { is_balance_recurrent, name, password } = req.body
        if (!is_balance_recurrent && !name && !password) throw new InvalidBodyError();

        const userRes = await this.userService.updateUser({ user_id: id,is_balance_recurrent,name,password })
        const { password: _, ...user } = userRes
        return new HandleResponse(HttpStatus.CREATED, undefined, user).execute(res)
    }
}
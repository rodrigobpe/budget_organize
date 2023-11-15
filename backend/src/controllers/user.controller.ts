import AuthDto from "@entities/auth/dto/auth.dto";
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
        const { user_id } = req
        const userRes = await this.userService.getUserById({ user_id })
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
        return new HandleResponse(HttpStatus.OK, `Usuário deletado`).execute(res)
    }

    async handleUpdateUser({ req, res }: HandleRequest) {
        const { id } = req.params
        const { is_budget_recurrent, name, password } = req.body
        if (!is_budget_recurrent && !name && !password) throw new InvalidBodyError();
        const userRes = await this.userService.updateUser({ user_id: id, is_budget_recurrent, name, password })
        const { password: _, ...user } = userRes
        return new HandleResponse(HttpStatus.CREATED, undefined, user).execute(res)
    }

    async handleAuth({ req, res }: HandleRequest) {
        const { email, password }: AuthDto = req.body
        if (!email || !password) throw new InvalidBodyError();
        const auth = await this.userService.auth({ email, password })
        return res.status(HttpStatus.CREATED).json(auth)
    }
}
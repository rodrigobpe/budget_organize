export class AuthResponseDto {
    user: {
        name: string,
        email: string
    }
    token: string
}
export interface UserDto {
    fullname?: string;
    username?: string;
    email: string;
    password: string;
} 
export interface UserRes {
    message: string;
    statusCode: number;
    data?: any;
}

export interface UserDto {
    fullname?: string;
    username?: string;
    email: string;
    password: string;
    user:{
        fullname:string;
        username:string;
        email:string;
    }
} 
export interface UserResponce {
    message: string;
    statusCode: number;
    data?: any;
}

export class User {

    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token: string | null = null;
}

export class AuthResponse{
    status?:string;
    token: string | null = null;;

}



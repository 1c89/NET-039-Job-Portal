export interface ILoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export class LoginCredentials implements ILoginCredentials
{
    constructor(public email: string,
        public password: string,
        public remember?: boolean){}

} 

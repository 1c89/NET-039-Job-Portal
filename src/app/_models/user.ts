export interface IUser {
    uid?: string;
    displayName: string;
    email: string;
    companyProfile:boolean;
}
  
export class User implements IUser {

    constructor (public uid: string,
              public displayName: string,
              public email: string,
              public companyProfile:boolean) 
    {}
}

export class AuthResponse{
    status?:string;
    token: string | null = null;;

}



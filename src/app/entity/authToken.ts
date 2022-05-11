export class AuthToken{
    token:string;
    userName:string;
    userType:string;
    constructor(token:string,userName:string,userType:string){
        this.token=token??'';
        this.userName=userName??'';
        this.userType=userType??'';
    }
}
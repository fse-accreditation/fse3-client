export class UserDetail{
    email:string;
    password:string;
    userName:string;
    constructor(email : string,password:string){
        this.email=email ?? '';
        this.password=password ?? '';
        
    }
}
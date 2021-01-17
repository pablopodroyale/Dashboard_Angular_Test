export class LoginUserDto {
    NickName:string;
    Password:string;

    constructor(formLogin: RawLoginUserDto){
        this.NickName = formLogin.Nickname;
        this.Password = formLogin.Password;
    }
}

export interface RawLoginUserDto{
    Nickname:string;
    Password:string;
}


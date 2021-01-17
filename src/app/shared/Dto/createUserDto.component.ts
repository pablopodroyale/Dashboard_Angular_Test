export class CreateUserDto {
    Name: string;
    Lastname: string;
    Email: string;
    Password:string;
    Nickname: string;
    Phones: CreatePhoneDto[];

    constructor(form: RawFormValueUserRegister) {
        this.Name = form.Name;
        this.Lastname = form.Lastname;
        this.Email = form.Email;
        this.Password = form.Passwords.Password;
        this.Nickname = null;
        if (form.Phones && form.Phones.length > 0) {
            this.Phones = [new CreatePhoneDto("135454")];
        }else{
            this.Phones = [new CreatePhoneDto("135454")]
        }
    }
}

export class CreatePhoneDto{
    Number : string;
    constructor(number:string){
        this.Number = number;
    }
}

export interface RawFormValueUserRegister {
    Name: string;
    Lastname: string;
    Email: string;
    Passwords: {
        Password: string
    };
    Phones?: string[];
}
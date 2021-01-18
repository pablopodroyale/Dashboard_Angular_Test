import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUserDto, RawLoginUserDto } from 'src/app/shared/Dto/loginUserDto.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  ERROR_NICKNAME_REQUIRED: string = "El email es requerido";
  ERROR_PASSWORD_REQUIRED: string = "El password es requerido";

  constructor(public userService: UserService, private fb: FormBuilder, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
    this.formLogin = this.fb.group({
      Nickname: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  ngOnDestroy() {
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      const loginUserDto = new LoginUserDto(this.formLogin.value as RawLoginUserDto);
      this.userService.Login(loginUserDto)
        .subscribe(
          (res: any) => {
            // res = res.json()
            if (res.succedded == true) {
              localStorage.setItem('token', res.obj);
              this.toast.success(`Bienvenido ${loginUserDto.NickName}`);
              this.formLogin.reset()
              this.router.navigate(['/dashboard']);
            } else {
              let errors = res.errors.map(x => x.description)
              this.toast.error(errors.join(', \n'));
              console.log(res.errors)
            }
          },
          error => {
            this.toast.error("Error de conexión");
            console.log(error)
          }
        );
    }
  }


}

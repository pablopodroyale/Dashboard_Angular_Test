import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { CreateUserDto, RawFormValueUserRegister } from 'src/app/shared/Dto/createUserDto.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  ERROR_NAME_REQUIRED : string = "El nombre es obligarorio";
  ERROR_PASSWORD_REQUIRED : string = "El password es obligatorio";
  ERROR_PASSWORD_MISMATCH : string = "Los passwords no coinciden";
  ERROR_PASSWORD_LENGTH : string = "El password debe contener 6 caracteres";

  formModel: FormGroup;

  constructor(public userService: UserService, private fb: FormBuilder, private toast: ToastrService, private router:Router) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      Name: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Passwords : this.fb.group({
        Password: ['', [Validators.required]],
        ConfirmPassword: ['', [Validators.required]]
      }, { 
        validator: this.ComparePasswords
      }),
      Phone: ['']
    })
  }

  ComparePasswords(fb: FormGroup) {
    let confirmPassCtrl = fb.get('ConfirmPassword');
    if (confirmPassCtrl.errors == null || 'passwordMismatch' in confirmPassCtrl.errors) {
      if (fb.get('Password').value !== confirmPassCtrl.value) {
        confirmPassCtrl.setErrors({
          passwordMismatch: true
        });
      } else {
        confirmPassCtrl.setErrors(null);
      }
    }
  }

  onSubmit(): void {
    if (this.formModel.valid) {
      const userDto = new CreateUserDto(this.formModel.value as RawFormValueUserRegister);
      this.userService.Register(userDto)
        .subscribe(
        (res:any) => {
          // res = res.json()
          if (res.succedded == true) {
            this.toast.success("Usuario creado con éxito");
            this.formModel.reset()
            this.router.navigate(['/login']);
          }else{
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

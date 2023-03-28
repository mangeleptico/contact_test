import { Component, OnInit,  Output, EventEmitter, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../core/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  form: FormGroup = this.createForm({
    email: '',
    password: ''
  });
  spinner: boolean = false;
  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private matSnackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
  }

 /**
 * Function that create a formGroup from the user model
 * @author Miguel Restrepo
 * @param model: The user model
 **/
  createForm(model: User): FormGroup {
    return this.fb.nonNullable.group(model);
  }

 /**
 * Allow to login in the app and redirect if the login is successfully
 * @author Miguel Restrepo
 **/
  get formValue() {
    return this.form.value as User;
  }

  logIn(): void {
    if (this.form.get('email')!.value !== ''){
      this.spinner = true;
      this.authenticationService.login(this.formValue)
      .then((response: any) => {
        this.router.navigate(['/desk/contact'])
        this.spinner = false;
      })
      .catch((error: any) => {
        this.matSnackBar.open('El nombre de usuario o contraseña son incorrectos', 'Ok', {"duration": 3000});
        this.spinner = false;
      });
    }
    else {
      this.form.markAllAsTouched();
      this.matSnackBar.open('Por favor ingresa correo y contraseña', 'Ok', {"duration": 3000});
    }
  }
}

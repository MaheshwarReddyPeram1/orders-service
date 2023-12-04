import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../config/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private userservice:UserService
    ){}
  isLoginError = false

  signInDetails = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit = () => {
    const controls = this.signInDetails.controls;
    let data = {
      "email": controls['email'].value,
      "password": controls['password'].value
    }
    console.log(data)
    if (controls['email'].value && controls['password'].value) {
      this.userservice.signIn(data).subscribe((da: any) => {
        if(da.status == 200){
          localStorage.setItem('user', JSON.stringify(da))
          this.router.navigateByUrl('home');
        }
        else
          this.isLoginError = true
      })
    }
    console.log(this.isLoginError);
    
  }

  onCreateAccount = () => {
    console.log("hello");
    
    this.router.navigateByUrl('signup');
  }
}

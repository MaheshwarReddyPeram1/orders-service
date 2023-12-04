import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../config/_services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    private router: Router,
    private userservice: UserService
  ) { }


  signInDetails = new FormGroup({
    UserName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit = () => {
    const controls = this.signInDetails.controls;
    let data = {
      "name": controls['UserName'].value,
      "email": controls['email'].value,
      "password": controls['password'].value
    }
    console.log(data)
    if (controls['UserName'].value && controls['email'].value && controls['password'].value) {
      this.userservice.signUp(data).subscribe((da: any) => {
        console.log(da);
        
        this.router.navigateByUrl('/');
      })
    }

  }

  onLogin = () => {
    this.router.navigateByUrl('/');
  }
}

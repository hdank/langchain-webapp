import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Authresponse } from '../authresponse';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: UserComponent = new UserComponent();
  private baseUrl="http://localhost:8080/user/sign-up";
  checkPassword(){
    var message = document.getElementById('message');
    var password = (<HTMLInputElement>document.getElementById('pwd'))!.value;
    var confirmPassword = (<HTMLInputElement>document.getElementById('confirm_pwd'))!.value;
    if(password == confirmPassword){
      document.getElementById('message')!.style.color ='green';
      document.getElementById('message')!.innerHTML ='trùng khớp';
    }
    else{
      document.getElementById('message')!!.innerHTML ='Không trùng khớp';
      document.getElementById('message')!!.style.color='red';
    }
  }
  constructor(private router:Router, private http: HttpClient){}
  signUp(){
    console.log("signUp method triggered");
    console.log(this.user);
    console.log(this.user.password);
    this.http.post<Authresponse>(`${this.baseUrl}`,this.user)
        .pipe(
          map(response => response),
          catchError(()=> of(""))
        )
        .subscribe((response) => {
          if(response){
            console.log("User successfully signed up: ", response);
            this.router.navigate(['/login'])
          }
          else{
            console.log("Sign up failed");
          }
        })
  }
}

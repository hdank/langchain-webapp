import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginUserService } from '../login-user.service';
import { SharedModuleComponent } from '../shared-module/shared-module.component';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SharedModuleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  user: UserComponent = new UserComponent();

  private baseUrl = "http://localhost:8080/user";

  constructor(private authService: AuthserviceService, private router: Router) {}

  userLogin() {
    this.authService.userLogin(this.user).subscribe(token=>{
      if(token){
        const tokenString = String(token);
        console.log(tokenString);
        localStorage.setItem('authToken',tokenString);
        this.router.navigate(['/home']);
      }
      else{
        alert("Please enter mssv and password correctly");
      }
    })
  }
}

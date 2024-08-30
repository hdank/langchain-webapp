import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthguardService } from './authguard.service';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'auto-login', component:LoginComponent},
    {path: 'home', component: ChatComponent, /*canActivate:[AuthguardService]*/},
    {path: 'logout', redirectTo: '/login', pathMatch: 'full' },
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'sign-up', component: SignupComponent}
];

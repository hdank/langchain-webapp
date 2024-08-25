import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  user:any;
  constructor(private http: HttpClient){}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.autoLogin(token);
    }
  }
  autoLogin(token: string) {
    this.http.get<any>('http://localhost:8080/user/auto-login', { params: { token } })
      .subscribe(
        user => {
          this.user = user;
          console.log('Auto-login successful', user);
        },
        error => {
          console.error('Auto-login failed', error);
          // Handle failed auto-login (e.g., redirect to login page)
        }
      );
  }

}

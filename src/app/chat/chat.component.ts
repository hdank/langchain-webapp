import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  encapsulation: ViewEncapsulation.None //apllying the css of the component to the insert element from user
})
export class ChatComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    var token = localStorage.getItem('authToken');
    if(token!= null){
      console.log("Chat page");
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  sendMessage(){
    var input = (<HTMLTextAreaElement>document.getElementById('textarea')).value;
    var now = new Date();
    if(input != null){
      var div = document.createElement('div');
      var p = document.createElement('p');
      var time = document.createElement('p');
      p.innerHTML = input;
      time.innerHTML = now.toLocaleString();
      div.className ="message-box right";
      div.appendChild(time);
      div.appendChild(p);
      document.getElementById('messages-container')?.appendChild(div);
      (<HTMLTextAreaElement>document.getElementById('textarea')).value ="";

      //Response from bot
      var div2 = document.createElement('div');
      var p2 = document.createElement('p');
      var time2 = document.createElement('p');
      div2.className ="message-box left";
      time2.innerHTML = now.toLocaleString();
      p2.innerHTML = "The bot haven't been integrated yet! :^))";
      div2.appendChild(time2);
      div2.appendChild(p2);
      document.getElementById('messages-container')?.appendChild(div2);
    }
  }
}

import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message: string): void {
    this.socket.emit('chat message', message);
  }

  receiveMessage(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('chat message', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}

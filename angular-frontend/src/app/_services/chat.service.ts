import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;

  constructor() {  
    this.socket = io({transports: ['websocket', 'polling', 'flashsocket']});
   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  //
}

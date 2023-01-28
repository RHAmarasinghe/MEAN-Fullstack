import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {io} from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  username: any;
  // public username$: BehaviorSubject<string> = new BehaviorSubject('');

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
  public sendMessage(message: string | undefined, username: string | undefined) {
    this.socket.emit('message', {message ,username});
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: string) =>{
      this.message$.next(message);
      console.log('name', this.username);
    });
    return this.message$.asObservable();
  };

  // public getMessageUser = () => {
  //   this.socket.on('username', (username: string) =>{
  //     this.username$.next(username);
  //   });
  //   return this.username$.asObservable();
  // };

}
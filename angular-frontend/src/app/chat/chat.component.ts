import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_services/chat.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'socketio-angular';
  newMessage: string | undefined;
  messageList: string[] = [];
  me: boolean | undefined;
  // usernameList: string[] = [];

  username?: string;
  isLoggedIn = true;

  constructor(private chatService: ChatService,
    private storageService: StorageService) { }

  // ngOnInit(): void {
  //   this.chatService.setupSocketConnection();
  // }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
  //

  sendMessage() {
    this.chatService.sendMessage(this.newMessage, this.username);
    this.newMessage = '';
    const user = this.storageService.getUser();
      this.username = user.username;
  }

  ngOnInit() {
      const user = this.storageService.getUser();
      this.username = user.username;

    this.chatService.setupSocketConnection();

    this.chatService.getNewMessage()
    .subscribe((message: string) => {
      this.messageList.push(message);
      
      if (message.includes(user.username)){
        this.me = true;
      }
      else {this.me = false;}
    })
    // this.chatService.getMessageUser()
    // .subscribe((username: string) => {
    //   this.usernameList.push(username);
    // })
  }

}
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'socketio-angular';
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
  //

}

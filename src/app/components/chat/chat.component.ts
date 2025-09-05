import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  selectedChat: any = null;
  messages: any[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chatService.getChats().subscribe({
      next: data => this.chats = data,
      error: err => console.error(err)
    });
  }

  openChat(chat: any) {
    this.selectedChat = chat;
    this.loadMessages(chat.id);
  }

  loadMessages(chatId: number) {
    this.chatService.getMessages(chatId).subscribe({
      next: data => this.messages = data.map(m => ({
        ...m,
        fromMe: m.fromUserId === this.selectedChat.currentUserId // adjust according to API
      })),
      error: err => console.error(err)
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.chatService.sendMessage(this.selectedChat.id, this.newMessage).subscribe({
      next: msg => {
        this.messages.push({ ...msg, fromMe: true });
        this.newMessage = '';
      },
      error: err => console.error(err)
    });
  }
}

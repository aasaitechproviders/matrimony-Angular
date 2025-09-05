import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  // 🔹 Get all chats of logged-in user
  getChats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Get messages in a chat
  getMessages(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${chatId}/messages`);
  }

  // 🔹 Send a new message
  sendMessage(chatId: number, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${chatId}/send`, { content });
  }

  // 🔹 (Optional) Start chat with another user
  // if you create a "start chat" endpoint later (e.g. POST /api/chat/start/{userId})
  startChat(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start/${userId}`, {});
  }
}

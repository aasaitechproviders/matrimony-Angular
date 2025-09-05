import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterestService {
  private apiUrl = 'http://localhost:8080/api/interests';

  constructor(private http: HttpClient) {}

  // 🔹 Get incoming (pending) interests
  getIncoming(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/incoming`);
  }

  // 🔹 Get outgoing (sent) interests
  getOutgoing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/outgoing`);
  }

  // 🔹 Send a new interest
  sendInterest(toUserId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${toUserId}`, {});
  }

  // 🔹 Accept interest
  acceptInterest(interestId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${interestId}/respond?action=accept`, {});
  }

  // 🔹 Reject interest
  rejectInterest(interestId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${interestId}/respond?action=reject`, {});
  }
}

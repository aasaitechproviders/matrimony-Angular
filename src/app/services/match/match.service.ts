import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = 'http://localhost:8080/matches';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

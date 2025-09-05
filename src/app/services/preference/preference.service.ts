import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private apiUrl = 'http://localhost:8080/preferences';

  constructor(private http: HttpClient) {}

  // Save (create/update) preferences
  savePreferences(prefs: any): Observable<any> {
    return this.http.post(this.apiUrl, prefs);
  }

  // Get preferences for current logged-in user
  getPreferences(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Delete preferences
  deletePreferences(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}

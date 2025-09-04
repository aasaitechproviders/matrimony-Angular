import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/profile';

  constructor(private http: HttpClient) {}

  // Save (create/update) profile with photos
  saveProfile(profile: any, photos: File[]): Observable<any> {
    const formData = new FormData();

    // Attach JSON as Blob
    formData.append(
      'profile',
      new Blob([JSON.stringify(profile)], { type: 'application/json' })
    );

    // Attach multiple photos
    photos.forEach(file => {
      formData.append('photos', file, file.name);
    });

    return this.http.post(this.apiUrl, formData);
  }

  // Get profile by email (JWT gives email)
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/byEmail`);
  }

  // Delete profile
  deleteProfile(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}

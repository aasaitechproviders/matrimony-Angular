import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private apiUrl = 'http://localhost:8080/search';

  constructor(private http: HttpClient) {}

  search(filters: any): Observable<any[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(k => {
      if (filters[k]) params = params.set(k, filters[k]);
    });
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}

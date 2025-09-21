import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rua {
  codrua?: number;
  nomerua: string;
}

@Injectable({
  providedIn: 'root'
})
export class RuaService {
  private apiUrl = 'http://localhost:8081/ruas';

  constructor(private http: HttpClient) { }

  getRuas(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.apiUrl);
  }

  getRua(id: number): Observable<Rua> {
    return this.http.get<Rua>(`${this.apiUrl}/${id}`);
  }

  createRua(rua: Rua): Observable<Rua> {
    return this.http.post<Rua>(this.apiUrl, rua);
  }

  updateRua(id: number, rua: Rua): Observable<Rua> {
    return this.http.put<Rua>(`${this.apiUrl}/${id}`, rua);
  }

  deleteRua(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Uf {
  coduf?: number;
  nomeuf: string;
  siglauf: string;
}

@Injectable({
  providedIn: 'root'
})
export class UfService {
  private apiUrl = 'http://localhost:8081/ufs';

  constructor(private http: HttpClient) { }

  getUfs(): Observable<Uf[]> {
    return this.http.get<Uf[]>(this.apiUrl);
  }

  getUf(id: number): Observable<Uf> {
    return this.http.get<Uf>(`${this.apiUrl}/${id}`);
  }

  createUf(uf: Uf): Observable<Uf> {
    return this.http.post<Uf>(this.apiUrl, uf);
  }

  updateUf(id: number, uf: Uf): Observable<Uf> {
    return this.http.put<Uf>(`${this.apiUrl}/${id}`, uf);
  }

  deleteUf(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
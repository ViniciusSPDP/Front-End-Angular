import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Bairro {
  codbairro?: number;
  nomebairro: string;
}

@Injectable({
  providedIn: 'root'
})
export class BairroService {
  private apiUrl = 'http://localhost:8081/bairros';
  constructor(private http: HttpClient) { }
  getBairros(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(this.apiUrl);
  }
  getBairro(id: number): Observable<Bairro> {
    return this.http.get<Bairro>(`${this.apiUrl}/${id}`);
  }
  createBairro(bairro: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(this.apiUrl, bairro);
  }
  updateBairro(id: number, bairro: Bairro): Observable<Bairro> {
    return this.http.put<Bairro>(`${this.apiUrl}/${id}`, bairro);
  }
  deleteBairro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
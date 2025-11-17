import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uf } from './uf';

export interface Cidade {
  codcidade?: number;
  nomecidade: string;
  uf: Uf;
}

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  private apiUrl = 'http://localhost:8081/cidades';

  constructor(private http: HttpClient) {}

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.apiUrl}`);
  }

  getCidade(id: number): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.apiUrl}/${id}`);
  }

  createCidade(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.apiUrl, cidade);
  }

  updateCidade(id: number, cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.apiUrl}/${id}`, cidade);
  }

  deleteCidade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

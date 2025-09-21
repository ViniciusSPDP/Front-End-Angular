import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// A interface Cep está correta
export interface Cep {
  codcep?: number;
  numerocep: string;
}

@Injectable({
  providedIn: 'root'
})
// Corrigido: Nome da classe alterado para CepService
export class CepService {
  // A URL da API para ceps está correta
  private apiUrl = 'http://localhost:8081/ceps';

  constructor(private http: HttpClient) { }

  // Corrigido: Método renomeado e tipos de retorno/casting ajustados
  getCeps(): Observable<Cep[]> {
    return this.http.get<Cep[]>(this.apiUrl);
  }

  // Corrigido: Método renomeado e tipos de retorno/casting ajustados
  getCep(id: number): Observable<Cep> {
    return this.http.get<Cep>(`${this.apiUrl}/${id}`);
  }

  // Corrigido: Método, parâmetro e tipos de retorno/casting ajustados
  createCep(cep: Cep): Observable<Cep> {
    return this.http.post<Cep>(this.apiUrl, cep);
  }

  // Corrigido: Método, parâmetro e tipos de retorno/casting ajustados
  updateCep(id: number, cep: Cep): Observable<Cep> {
    return this.http.put<Cep>(`${this.apiUrl}/${id}`, cep);
  }

  // Corrigido: Método renomeado
  deleteCep(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
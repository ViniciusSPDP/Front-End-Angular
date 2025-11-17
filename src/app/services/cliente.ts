import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sexo } from './sexo';
import { Bairro } from './bairro';
import { Cidade } from './cidade';
import { Rua } from './rua';
import { Cep } from './cep';

export interface Cliente {
  codcliente?: number;
  nomecliente: string;
  cpf: string;
  datanasc: string;
  numerocasa: string;
  sexo: Sexo;
  bairro: Bairro;
  cidade: Cidade;
  rua: Rua;
  cep: Cep;
}


@Injectable({
    providedIn: 'root'
})

export class ClienteService {
  private apiUrl = 'http://localhost:8081/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
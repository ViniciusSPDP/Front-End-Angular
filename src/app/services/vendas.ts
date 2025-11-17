import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente'; 
import { Produto } from './produto'; 

export interface VendaProduto {
  produto: Produto;
  quantv: number;
  valorv: number;
}

export interface Venda {
  codvenda?: number;
  datavenda: string; 
  cliente: Cliente;
  produtos: VendaProduto[];
}

export interface VendaProdutoForm {
  produtoId: number;
  quantidadev: number;
  valorv: number;
}

export interface VendaForm {
  clienteId: number;
  produtos: VendaProdutoForm[];
}


@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:8081/vendas';

  constructor(private http: HttpClient) { }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  getVenda(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  createVenda(venda: VendaForm): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  updateVenda(id: number, venda: VendaForm): Observable<Venda> {
    return this.http.put<Venda>(`${this.apiUrl}/${id}`, venda);
  }

  deleteVenda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
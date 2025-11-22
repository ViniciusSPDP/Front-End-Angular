import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService, Cliente } from '../../services/cliente';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './cliente-list.html',
  styleUrls: ['./cliente-list.scss']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(
      data => this.clientes = data,
      error => console.error('Erro ao carregar Clientes', error)
    );
  }

  deleteCliente(id: number): void {
    if(confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(
        () => this.loadClientes(),
        error => console.error('Erro ao excluir Cliente', error)
      );
    }
  }
}
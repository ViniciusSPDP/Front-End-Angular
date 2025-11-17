import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService, Cliente } from '../../services/cliente';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, MaterialModule],
  templateUrl: './cliente-list.html',
  styleUrls: ['./cliente-list.scss']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['codcliente', 'nomecliente', 'cpf', 'datanasc', 'cidade', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir este cliente?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(id).subscribe(
          () => {
            this.loadClientes();
            this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Erro ao excluir Cliente', error);
            this.snackBar.open('Erro ao excluir cliente.', 'Fechar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
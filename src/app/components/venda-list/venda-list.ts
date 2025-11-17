import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VendaService, Venda } from '../../services/vendas';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe, MaterialModule],
  templateUrl: './venda-list.html',
  styleUrls: ['./venda-list.scss']
})
export class VendaListComponent implements OnInit {
  vendas: Venda[] = [];
  displayedColumns: string[] = ['codvenda', 'datavenda', 'cliente', 'produtos', 'valorTotal', 'acoes'];

  constructor(
    private vendaService: VendaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadVendas();
  }

  loadVendas(): void {
    this.vendaService.getVendas().subscribe(
      data => this.vendas = data,
      error => console.error('Erro ao carregar Vendas', error)
    );
  }

  deleteVenda(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir esta venda? O estoque dos produtos será estornado.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vendaService.deleteVenda(id).subscribe(
          () => {
            this.loadVendas();
            this.snackBar.open('Venda excluída com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Erro ao excluir Venda', error);
            this.snackBar.open('Erro ao excluir venda.', 'Fechar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  calcularTotalVenda(venda: Venda): number {
    if (!venda.produtos) {
      return 0;
    }
    return venda.produtos.reduce((total, item) => total + (item.valorv * item.quantv), 0);
  }
}
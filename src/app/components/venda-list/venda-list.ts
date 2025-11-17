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
  loading: boolean = true;

  constructor(
    private vendaService: VendaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadVendas();
  }

  loadVendas(): void {
    this.loading = true;
    this.vendaService.getVendas().subscribe({
      next: (data) => {
        this.vendas = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar Vendas', error);
        this.loading = false;
        this.snackBar.open('Erro ao carregar vendas', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteVenda(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Excluir Venda',
        message: 'Tem certeza que deseja excluir esta venda? O estoque dos produtos será estornado automaticamente. Esta ação não pode ser desfeita.',
        confirmText: 'Sim, Excluir',
        cancelText: 'Cancelar',
        type: 'danger'
      },
      disableClose: false,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDelete(id);
      }
    });
  }

  private performDelete(id: number): void {
    // Mostrar loading
    const loadingSnackBar = this.snackBar.open('Excluindo venda...', '', {
      duration: undefined,
      panelClass: ['loading-snackbar']
    });

    this.vendaService.deleteVenda(id).subscribe({
      next: () => {
        loadingSnackBar.dismiss();
        this.loadVendas();
        
        this.snackBar.open('✓ Venda excluída com sucesso! Estoque atualizado.', 'Fechar', {
          duration: 4000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        loadingSnackBar.dismiss();
        console.error('Erro ao excluir Venda', error);
        
        const errorMessage = error.error?.message || 'Erro ao excluir venda. Tente novamente.';
        
        this.snackBar.open(`✗ ${errorMessage}`, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  calcularTotalVenda(venda: Venda): number {
    if (!venda.produtos) {
      return 0;
    }
    return venda.produtos.reduce((total, item) => total + (item.valorv * item.quantv), 0);
  }

  getStatusBadgeClass(valor: number): string {
    if (valor >= 1000) return 'badge-success';
    if (valor >= 500) return 'badge-warning';
    return 'badge-info';
  }
}
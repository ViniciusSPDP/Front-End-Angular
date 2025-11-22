import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VendaService, Venda } from '../../services/vendas';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './venda-list.html',
  styleUrls: ['./venda-list.scss']
})
export class VendaListComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(private vendaService: VendaService) { }

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
    if(confirm('Tem certeza que deseja excluir esta venda? O estoque dos produtos será estornado automaticamente.')) {
      this.vendaService.deleteVenda(id).subscribe(
        () => {
          this.loadVendas();
          alert('Venda excluída com sucesso!');
        },
        error => console.error('Erro ao excluir Venda', error)
      );
    }
  }

  calcularTotalVenda(venda: Venda): number {
    if (!venda.produtos) {
      return 0;
    }
    return venda.produtos.reduce((total, item) => total + (item.valorv * item.quantv), 0);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Imports para formatação
import { RouterLink } from '@angular/router';
import { VendaService, Venda } from '../../services/vendas'; // Importando o novo serviço

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe], // Adicionando os Pipes
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
    if(confirm('Tem certeza que deseja excluir esta venda? O estoque dos produtos será estornado.')) {
      this.vendaService.deleteVenda(id).subscribe(
        () => this.loadVendas(),
        error => console.error('Erro ao excluir Venda', error)
      );
    }
  }

  // Função auxiliar para calcular o total da venda para exibição na lista
  calcularTotalVenda(venda: Venda): number {
    if (!venda.produtos) {
      return 0;
    }
    return venda.produtos.reduce((total, item) => total + (item.valorv * item.quantv), 0);
  }
}
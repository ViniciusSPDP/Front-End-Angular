import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-produto-list',
  standalone: true,

  imports: [CommonModule, RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './produto-list.html',
  styleUrls: ['./produto-list.scss'] 
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      data => this.produtos = data,
      error => console.error('Erro ao carregar Produtos', error)
    );
  }

  deleteProduto(id: number): void {
    if(confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe(
        () => this.loadProdutos(),
        error => console.error('Erro ao excluir Produto', error)
      );
    }
  }
}
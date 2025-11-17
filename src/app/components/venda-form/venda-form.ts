import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Serviços
import { VendaService, VendaForm, VendaProdutoForm } from '../../services/vendas';
import { Cliente, ClienteService } from '../../services/cliente';
import { Produto, ProdutoService } from '../../services/produto';

interface ItemVendaTela {
  produto: Produto;
  quantidade: number;
  valor: number;
}

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './venda-form.html',
  styleUrls: ['./venda-form.scss']
})
export class VendaFormComponent implements OnInit {

  vendaForm: { clienteId?: number } = {}; 
  
  clientes: Cliente[] = [];
  produtos: Produto[] = [];


  itemForm: { produtoId?: number, quantidade: number, valor: number } = {
    quantidade: 1,
    valor: 0
  };
  itensVenda: ItemVendaTela[] = [];

  isEdit = false;
  vendaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.loadClientes();
    this.loadProdutos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vendaId = +id;
      
      this.vendaService.getVenda(this.vendaId).subscribe(data => {
        this.vendaForm.clienteId = data.cliente.codcliente;
        
        this.itensVenda = data.produtos.map(vp => ({
          produto: vp.produto,
          quantidade: vp.quantv,
          valor: vp.valorv
        }));
      });
    }
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => this.produtos = data);
  }

  
  onProdutoSelecionado(): void {
    if (this.itemForm.produtoId) {
      const produtoSelecionado = this.produtos.find(p => p.codproduto == this.itemForm.produtoId);
      if (produtoSelecionado) {
        this.itemForm.valor = produtoSelecionado.valor;
      }
    }
  }

  adicionarItem(): void {
    if (!this.itemForm.produtoId) { 
      alert('Selecione um produto.');
      return;
    }

    const produtoSelecionado = this.produtos.find(p => p.codproduto == this.itemForm.produtoId);
    if (!produtoSelecionado) {
      alert('Produto selecionado não é válido.');
      return;
    }

    if (this.itemForm.quantidade <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    }
    if (this.itemForm.quantidade > produtoSelecionado.quantidade) {
      alert(`Quantidade insuficiente em estoque. Disponível: ${produtoSelecionado.quantidade}`);
      return;
    }

    this.itensVenda.push({
      produto: produtoSelecionado,
      quantidade: this.itemForm.quantidade,
      valor: this.itemForm.valor
    });

    this.itemForm = {
      produtoId: undefined, 
      quantidade: 1,
      valor: 0
    };
  }

  removerItem(index: number): void {
    this.itensVenda.splice(index, 1);
  }

  calcularTotalVenda(): number {
    return this.itensVenda.reduce((total, item) => total + (item.valor * item.quantidade), 0);
  }

  onSubmit(): void {
    if (!this.vendaForm.clienteId) {
      alert('Selecione um cliente.');
      return;
    }
    if (this.itensVenda.length === 0) {
      alert('A venda deve conter pelo menos um produto.'); 
      return;
    }

    const produtosForm: VendaProdutoForm[] = this.itensVenda.map(item => ({
      produtoId: item.produto.codproduto!,
      quantidadev: item.quantidade,
      valorv: item.valor
    }));

    const vendaParaSalvar: VendaForm = {
      clienteId: this.vendaForm.clienteId!,
      produtos: produtosForm
    };

    if (this.isEdit && this.vendaId) {
      this.vendaService.updateVenda(this.vendaId, vendaParaSalvar).subscribe(
        () => this.router.navigate(['/vendas']),
        error => console.error('Erro ao atualizar Venda', error)
      );
    } else {
      this.vendaService.createVenda(vendaParaSalvar).subscribe(
        () => this.router.navigate(['/vendas']),
        error => console.error('Erro ao criar Venda', error)
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './venda-form.html',
  styleUrls: ['./venda-form.scss']
})
export class VendaFormComponent implements OnInit {

  form: FormGroup;
  itemForm: FormGroup;
  
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  
  itensVenda: ItemVendaTela[] = [];

  isEdit = false;
  vendaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) {
    this.form = this.fb.group({
      clienteId: [null, Validators.required]
    });

    this.itemForm = this.fb.group({
      produtoId: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valor: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadProdutos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vendaId = +id;
      
      this.vendaService.getVenda(this.vendaId).subscribe(data => {
        this.form.patchValue({ clienteId: data.cliente.codcliente });
        
        this.itensVenda = data.produtos.map(vp => ({
          produto: vp.produto,
          quantidade: vp.quantv,
          valor: vp.valorv
        }));
      });
    }

    this.itemForm.get('produtoId')?.valueChanges.subscribe(produtoId => {
      if (produtoId) {
        const produtoSelecionado = this.produtos.find(p => p.codproduto == produtoId);
        if (produtoSelecionado) {
          this.itemForm.patchValue({ valor: produtoSelecionado.valor });
        }
      }
    });
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => this.produtos = data);
  }

  adicionarItem(): void {
    if (this.itemForm.invalid) {
      alert('Preencha os dados do item corretamente.');
      return;
    }

    const { produtoId, quantidade, valor } = this.itemForm.value;
    const produtoSelecionado = this.produtos.find(p => p.codproduto == produtoId);

    if (!produtoSelecionado) {
      alert('Produto selecionado não é válido.');
      return;
    }

    if (quantidade > produtoSelecionado.quantidade) {
      alert(`Quantidade insuficiente em estoque. Disponível: ${produtoSelecionado.quantidade}`);
      return;
    }

    this.itensVenda.push({
      produto: produtoSelecionado,
      quantidade: quantidade,
      valor: valor
    });

    this.itemForm.reset({
      produtoId: null,
      quantidade: 1,
      valor: 0
    });
  }

  removerItem(index: number): void {
    this.itensVenda.splice(index, 1);
  }

  calcularTotalVenda(): number {
    return this.itensVenda.reduce((total, item) => total + (item.valor * item.quantidade), 0);
  }

  onSubmit(): void {
    if (this.form.invalid) {
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
      clienteId: this.form.value.clienteId,
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
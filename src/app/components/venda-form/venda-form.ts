import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Serviços
import { VendaService, VendaForm, VendaProdutoForm } from '../../services/vendas';
import { Cliente, ClienteService } from '../../services/cliente';
import { Produto, ProdutoService } from '../../services/produto';
import { MaterialModule } from '../../material.module';

interface ItemVendaTela {
  produto: Produto;
  quantidade: number;
  valor: number;
}

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe, MaterialModule, ReactiveFormsModule],
  templateUrl: './venda-form.html',
  styleUrls: ['./venda-form.scss']
})
export class VendaFormComponent implements OnInit {

  form: FormGroup;
  itemForm: FormGroup;
  
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  
  itensVenda: ItemVendaTela[] = [];
  displayedColumns: string[] = ['produto', 'quantidade', 'valor', 'subtotal', 'acao'];

  isEdit = false;
  vendaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
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
      this.snackBar.open('Preencha os dados do item corretamente.', 'Fechar', { duration: 3000 });
      return;
    }

    const { produtoId, quantidade, valor } = this.itemForm.value;
    const produtoSelecionado = this.produtos.find(p => p.codproduto == produtoId);

    if (!produtoSelecionado) {
      this.snackBar.open('Produto selecionado não é válido.', 'Fechar', { duration: 3000 });
      return;
    }

    if (quantidade > produtoSelecionado.quantidade) {
      this.snackBar.open(`Quantidade insuficiente em estoque. Disponível: ${produtoSelecionado.quantidade}`, 'Fechar', { duration: 3000 });
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
      this.snackBar.open('Selecione um cliente.', 'Fechar', { duration: 3000 });
      return;
    }
    if (this.itensVenda.length === 0) {
      this.snackBar.open('A venda deve conter pelo menos um produto.', 'Fechar', { duration: 3000 });
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

    const successAction = () => {
      this.snackBar.open(`Venda ${this.isEdit ? 'atualizada' : 'criada'} com sucesso!`, 'Fechar', { duration: 3000 });
      this.router.navigate(['/vendas']);
    };

    const errorAction = (error: any) => {
      console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'criar'} Venda`, error);
      this.snackBar.open(`Erro ao ${this.isEdit ? 'atualizar' : 'criar'} venda.`, 'Fechar', { duration: 3000 });
    };

    if (this.isEdit && this.vendaId) {
      this.vendaService.updateVenda(this.vendaId, vendaParaSalvar).subscribe(successAction, errorAction);
    } else {
      this.vendaService.createVenda(vendaParaSalvar).subscribe(successAction, errorAction);
    }
  }
}
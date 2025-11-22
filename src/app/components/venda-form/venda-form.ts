import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Serviços
import { VendaService, VendaForm, VendaProdutoForm } from '../../services/vendas';
import { Cliente, ClienteService } from '../../services/cliente';
import { Produto, ProdutoService } from '../../services/produto';
import { NotificationService } from '../../services/notification';

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
    private produtoService: ProdutoService,
    private notification: NotificationService
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
      
      this.vendaService.getVenda(this.vendaId).subscribe(
        data => {
          this.form.patchValue({ clienteId: data.cliente.codcliente });
          
          this.itensVenda = data.produtos.map(vp => ({
            produto: vp.produto,
            quantidade: vp.quantv,
            valor: vp.valorv
          }));
        },
        error => {
          console.error('Erro ao carregar Venda', error);
          this.notification.error('Erro ao carregar dados da venda');
        }
      );
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
    // 1. Validações iniciais do formulário
    if (this.itemForm.invalid) {
      this.notification.warning('Preencha os dados do item corretamente.');
      return;
    }

    const { produtoId, quantidade, valor } = this.itemForm.value;
    const produtoSelecionado = this.produtos.find(p => p.codproduto == produtoId);

    if (!produtoSelecionado) {
      this.notification.warning('Produto selecionado não é válido.');
      return;
    }

    // 2. Verifica se o produto já existe na lista de itens da venda
    const itemExistente = this.itensVenda.find(item => item.produto.codproduto === produtoSelecionado.codproduto);

    if (itemExistente) {
      // --- CENÁRIO: PRODUTO JÁ EXISTE NA LISTA ---
      
      // Calcula a nova quantidade total (o que já tinha + o que está sendo adicionado)
      const novaQuantidadeTotal = itemExistente.quantidade + quantidade;

      // Valida o estoque considerando a SOMA das quantidades
      if (novaQuantidadeTotal > produtoSelecionado.quantidade) {
        this.notification.warning(
          `Estoque insuficiente! Disponível: ${produtoSelecionado.quantidade}. ` +
          `Você já tem ${itemExistente.quantidade} na lista e tentou adicionar mais ${quantidade}.`
        );
        return;
      }

      // Atualiza a quantidade do item existente em vez de criar um novo
      itemExistente.quantidade = novaQuantidadeTotal;
      
      // Opcional: Atualizar o valor unitário se o usuário tiver alterado
      // itemExistente.valor = valor; 

      this.notification.info(`Quantidade do produto "${produtoSelecionado.nomeproduto}" atualizada para ${novaQuantidadeTotal}.`);

    } else {
      // --- CENÁRIO: PRODUTO NOVO NA LISTA ---

      // Valida estoque normal
      if (quantidade > produtoSelecionado.quantidade) {
        this.notification.warning(`Quantidade insuficiente em estoque. Disponível: ${produtoSelecionado.quantidade}`);
        return;
      }

      // Adiciona o novo item ao array
      this.itensVenda.push({
        produto: produtoSelecionado,
        quantidade: quantidade,
        valor: valor
      });
    }

    // 3. Limpa o formulário para o próximo item
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
      this.notification.warning('Selecione um cliente.');
      return;
    }
    if (this.itensVenda.length === 0) {
      this.notification.warning('A venda deve conter pelo menos um produto.');
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
      this.vendaService.updateVenda(this.vendaId, vendaParaSalvar).subscribe({
        next: () => {
          this.notification.success('Venda atualizada com sucesso!');
          setTimeout(() => this.router.navigate(['/vendas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar Venda', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Venda atualizada com sucesso!');
            setTimeout(() => this.router.navigate(['/vendas']), 1000);
          } else {
            this.notification.error('Erro ao atualizar venda. Tente novamente.');
          }
        }
      });
    } else {
      this.vendaService.createVenda(vendaParaSalvar).subscribe({
        next: () => {
          this.notification.success('Venda cadastrada com sucesso!');
          setTimeout(() => this.router.navigate(['/vendas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar Venda', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Venda cadastrada com sucesso!');
            setTimeout(() => this.router.navigate(['/vendas']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar venda. Tente novamente.');
          }
        }
      });
    }
  }
}
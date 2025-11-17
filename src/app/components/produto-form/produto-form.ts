import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto';
import { MarcaService, Marca } from '../../services/marca';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.scss'] 
})
export class ProdutoFormComponent implements OnInit {

  produto: Produto = {
    nomeproduto: '',
    valor: 0,
    quantidade: 0,
    marca: {} as Marca,
    tipo: {} as Tipo
  };
  
  marcas: Marca[] = [];
  tipos: Tipo[] = [];

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private marcaService: MarcaService,
    private tipoService: TipoService
  ) { }

  ngOnInit(): void {
    this.loadMarcas();
    this.loadTipos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.produtoService.getProduto(+id).subscribe(
        data => this.produto = data,
        error => console.error('Erro ao carregar Produto', error)
      );
    }
  }

  loadMarcas(): void {
    this.marcaService.getMarcas().subscribe(data => this.marcas = data);
  }
  loadTipos(): void {
    this.tipoService.getTipos().subscribe(data => this.tipos = data);
  }

  onSubmit(): void {
    this.produto.marca = { codmarca: this.produto.marca.codmarca } as Marca;
    this.produto.tipo = { codtipo: this.produto.tipo.codtipo } as Tipo;

    if (this.isEdit) {
      this.produtoService.updateProduto(this.produto.codproduto!, this.produto).subscribe(
        () => this.router.navigate(['/produtos']),
        error => console.error('Erro ao atualizar Produto', error)
      );
    } else {
      this.produtoService.createProduto(this.produto).subscribe(
        () => this.router.navigate(['/produtos']),
        error => console.error('Erro ao criar Produto', error)
      );
    }
  }
}
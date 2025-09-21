// bairro-list.ts - CORRIGIDO

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BairroService, Bairro } from '../../services/bairro';

@Component({
  selector: 'app-bairros-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bairro-list.html',
  styleUrls: ['./bairro-list.scss']
})
export class BairroListComponent implements OnInit {
  // Corrigido: Renomeado para o plural para evitar conflito com a variável do loop
  bairros: Bairro[] = [];

  constructor(private bairroService: BairroService) { }

  ngOnInit(): void {
    this.loadBairros();
  }

  loadBairros(): void {
    this.bairroService.getBairros().subscribe(
      // Corrigido: Atribuindo dados à propriedade 'bairros'
      data => this.bairros = data,
      error => console.error('Erro ao carregar bairros', error)
    );
  }

  deleteBairro(id: number): void {
    if(confirm('Tem certeza que deseja excluir este bairro?')) {
      this.bairroService.deleteBairro(id).subscribe(
        () => this.loadBairros(),
        // Corrigido: Mensagem de erro ajustada
        error => console.error('Erro ao excluir bairro', error)
      );
    }
  }
}
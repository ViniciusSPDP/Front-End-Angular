import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// O import do serviço e da interface já estava correto
import { CepService, Cep } from '../../services/cep';

@Component({
  selector: 'app-cep-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cep-list.html',
  styleUrls: ['./cep-list.scss']
})
// Corrigido: Nome da classe alterado para CepListComponent
export class CepListComponent implements OnInit {
  // Corrigido: Propriedade e tipo de dados alterados para 'ceps' e 'Cep'
  ceps: Cep[] = [];

  // Corrigido: Injetando o CepService
  constructor(private cepService: CepService) { }

  ngOnInit(): void {
    // Corrigido: Chamando o método para carregar CEPs
    this.loadCeps();
  }

  // Corrigido: Método renomeado e ajustado para carregar CEPs
  loadCeps(): void {
    this.cepService.getCeps().subscribe(
      data => this.ceps = data,
      error => console.error('Erro ao carregar CEPs', error)
    );
  }

  // Corrigido: Método renomeado e ajustado para deletar CEP
  deleteCep(id: number): void {
    if(confirm('Tem certeza que deseja excluir este CEP?')) {
      this.cepService.deleteCep(id).subscribe(
        () => this.loadCeps(),
        error => console.error('Erro ao excluir CEP', error)
      );
    }
  }
}
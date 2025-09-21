import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// O import do serviço e da interface já estava correto
import { CepService, Cep } from '../../services/cep';

@Component({
  selector: 'app-cep-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cep-form.html',
  styleUrls: ['./cep-form.scss']
})
// Corrigido: Nome da classe alterado para CepFormComponent
export class CepFormComponent implements OnInit {
  // Corrigido: Objeto e tipo de dados alterados para 'cep' e 'Cep'
  cep: Cep = { numerocep: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // Corrigido: Injetando o CepService
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      // Corrigido: Chamando o método para buscar um único CEP
      this.cepService.getCep(+id).subscribe(
        data => this.cep = data,
        error => console.error('Erro ao carregar CEP', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      // Corrigido: Chamando o método para atualizar o CEP
      this.cepService.updateCep(this.cep.codcep!, this.cep).subscribe(
        // Corrigido: Redirecionando para a lista de CEPs
        () => this.router.navigate(['/ceps']),
        error => console.error('Erro ao atualizar CEP', error)
      );
    } else {
      // Corrigido: Chamando o método para criar um novo CEP
      this.cepService.createCep(this.cep).subscribe(
        // Corrigido: Redirecionando para a lista de CEPs
        () => this.router.navigate(['/ceps']),
        error => console.error('Erro ao criar CEP', error)
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CepService, Cep } from '../../services/cep';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-cep-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cep-form.html',
  styleUrls: ['./cep-form.scss']
})
export class CepFormComponent implements OnInit {
  cep: Cep = { numerocep: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cepService.getCep(+id).subscribe(
        data => this.cep = data,
        error => {
          console.error('Erro ao carregar CEP', error);
          this.notification.error('Erro ao carregar dados do CEP');
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.cep.numerocep || this.cep.numerocep.trim() === '') {
      this.notification.warning('Por favor, preencha o número do CEP');
      return;
    }

    if (this.isEdit) {
      this.cepService.updateCep(this.cep.codcep!, this.cep).subscribe({
        next: () => {
          this.notification.success('CEP atualizado com sucesso!');
          setTimeout(() => this.router.navigate(['/ceps']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar CEP', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('CEP atualizado com sucesso!');
            setTimeout(() => this.router.navigate(['/ceps']), 1000);
          } else {
            this.notification.error('Erro ao atualizar CEP. Tente novamente.');
          }
        }
      });
    } else {
      this.cepService.createCep(this.cep).subscribe({
        next: () => {
          this.notification.success('CEP cadastrado com sucesso!');
          setTimeout(() => this.router.navigate(['/ceps']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar CEP', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('CEP cadastrado com sucesso!');
            setTimeout(() => this.router.navigate(['/ceps']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar CEP. Tente novamente.');
          }
        }
      });
    }
  }
}
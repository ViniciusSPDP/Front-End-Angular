import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BairroService, Bairro } from '../../services/bairro';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-bairro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bairro-form.html',
  styleUrls: ['./bairro-form.scss']
})
export class BairroFormComponent implements OnInit {
  bairro: Bairro = { nomebairro: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bairroService: BairroService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bairroService.getBairro(+id).subscribe(
        data => this.bairro = data,
        error => {
          console.error('Erro ao carregar bairro', error);
          this.notification.error('Erro ao carregar dados do bairro');
        }
      );
    }
  }

  onSubmit(): void {    
    if (!this.bairro.nomebairro || this.bairro.nomebairro.trim() === '') {
      this.notification.warning('Por favor, preencha o nome do bairro');
      return;
    }

    if (this.isEdit) {
      this.bairroService.updateBairro(this.bairro.codbairro!, this.bairro).subscribe({
        next: () => {
          this.notification.success('Bairro atualizado com sucesso!');
          setTimeout(() => this.router.navigate(['/bairros']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar bairro', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Bairro atualizado com sucesso!');
            setTimeout(() => this.router.navigate(['/bairros']), 1000);
          } else {
            this.notification.error('Erro ao atualizar bairro. Tente novamente.');
          }
        }
      });
    } else {
      this.bairroService.createBairro(this.bairro).subscribe({
        next: () => {
          this.notification.success('Bairro cadastrado com sucesso!');
          setTimeout(() => this.router.navigate(['/bairros']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar bairro', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Bairro cadastrado com sucesso!');
            setTimeout(() => this.router.navigate(['/bairros']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar bairro. Tente novamente.');
          }
        }
      });
    }
  }
}
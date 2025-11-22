import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UfService, Uf } from '../../services/uf';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-uf-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './uf-form.html',
  styleUrls: ['./uf-form.scss']
})
export class UfFormComponent implements OnInit {
  uf: Uf = { nomeuf: '', siglauf: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ufService: UfService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ufService.getUf(+id).subscribe(
        data => this.uf = data,
        error => {
          console.error('Erro ao carregar UF', error);
          this.notification.error('Erro ao carregar dados da UF');
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.uf.nomeuf || this.uf.nomeuf.trim() === '' || !this.uf.siglauf || this.uf.siglauf.trim() === '') {
      this.notification.warning('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (this.isEdit) {
      this.ufService.updateUf(this.uf.coduf!, this.uf).subscribe({
        next: () => {
          this.notification.success('UF atualizada com sucesso!');
          setTimeout(() => this.router.navigate(['/ufs']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar UF', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('UF atualizada com sucesso!');
            setTimeout(() => this.router.navigate(['/ufs']), 1000);
          } else {
            this.notification.error('Erro ao atualizar UF. Tente novamente.');
          }
        }
      });
    } else {
      this.ufService.createUf(this.uf).subscribe({
        next: () => {
          this.notification.success('UF cadastrada com sucesso!');
          setTimeout(() => this.router.navigate(['/ufs']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar UF', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('UF cadastrada com sucesso!');
            setTimeout(() => this.router.navigate(['/ufs']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar UF. Tente novamente.');
          }
        }
      });
    }
  }
}
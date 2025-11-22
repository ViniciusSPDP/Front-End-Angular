import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TipoService, Tipo } from '../../services/tipo';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-tipo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tipo-form.html',
  styleUrls: ['./tipo-form.scss']
})
export class TipoFormComponent implements OnInit {
  tipo: Tipo = { nometipo: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: TipoService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoService.getTipo(+id).subscribe(
        data => this.tipo = data,
        error => {
          console.error('Erro ao carregar Tipo', error);
          this.notification.error('Erro ao carregar dados do tipo');
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.tipo.nometipo || this.tipo.nometipo.trim() === '') {
      this.notification.warning('Por favor, preencha o nome do tipo');
      return;
    }

    if (this.isEdit) {
      this.tipoService.updateTipo(this.tipo.codtipo!, this.tipo).subscribe({
        next: () => {
          this.notification.success('Tipo atualizado com sucesso!');
          setTimeout(() => this.router.navigate(['/tipos']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar Tipo', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Tipo atualizado com sucesso!');
            setTimeout(() => this.router.navigate(['/tipos']), 1000);
          } else {
            this.notification.error('Erro ao atualizar tipo. Tente novamente.');
          }
        }
      });
    } else {
      this.tipoService.createTipo(this.tipo).subscribe({
        next: () => {
          this.notification.success('Tipo cadastrado com sucesso!');
          setTimeout(() => this.router.navigate(['/tipos']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar Tipo', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Tipo cadastrado com sucesso!');
            setTimeout(() => this.router.navigate(['/tipos']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar tipo. Tente novamente.');
          }
        }
      });
    }
  }
}
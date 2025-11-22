import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RuaService, Rua } from '../../services/rua';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-rua-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rua-form.html',
  styleUrls: ['./rua-form.scss']
})
export class RuaFormComponent implements OnInit {
  rua: Rua = { nomerua: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ruaService: RuaService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ruaService.getRua(+id).subscribe(
        data => this.rua = data,
        error => {
          console.error('Erro ao carregar Rua', error);
          this.notification.error('Erro ao carregar dados da rua');
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.rua.nomerua || this.rua.nomerua.trim() === '') {
      this.notification.warning('Por favor, preencha o nome da rua');
      return;
    }

    if (this.isEdit) {
      this.ruaService.updateRua(this.rua.codrua!, this.rua).subscribe({
        next: () => {
          this.notification.success('Rua atualizada com sucesso!');
          setTimeout(() => this.router.navigate(['/ruas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar Rua', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Rua atualizada com sucesso!');
            setTimeout(() => this.router.navigate(['/ruas']), 1000);
          } else {
            this.notification.error('Erro ao atualizar rua. Tente novamente.');
          }
        }
      });
    } else {
      this.ruaService.createRua(this.rua).subscribe({
        next: () => {
          this.notification.success('Rua cadastrada com sucesso!');
          setTimeout(() => this.router.navigate(['/ruas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar Rua', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Rua cadastrada com sucesso!');
            setTimeout(() => this.router.navigate(['/ruas']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar rua. Tente novamente.');
          }
        }
      });
    }
  }
}
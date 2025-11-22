import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SexoService, Sexo } from '../../services/sexo';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-sexo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sexo-form.html',
  styleUrls: ['./sexo-form.scss']
})
export class SexoFormComponent implements OnInit {
  sexo: Sexo = { nomesexo: '' };
  isEdit = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sexoService: SexoService,
    private notification: NotificationService
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.sexoService.getSexo(+id).subscribe(
        data => this.sexo = data,
        error => {
          console.error('Erro ao carregar sexo', error);
          this.notification.error('Erro ao carregar dados do sexo');
        }
      );
    }
  }
  
  onSubmit(): void {    
    if (!this.sexo.nomesexo || this.sexo.nomesexo.trim() === '') {
      this.notification.warning('Por favor, preencha o nome do sexo');
      return;
    }

    if (this.isEdit) {
      this.sexoService.updateSexo(this.sexo.codsexo!, this.sexo).subscribe({
        next: () => {
          this.notification.success('Sexo atualizado com sucesso!');
          setTimeout(() => this.router.navigate(['/sexos']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar sexo', error);
          // Verifica se realmente houve erro ou se é apenas retorno vazio
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Sexo atualizado com sucesso!');
            setTimeout(() => this.router.navigate(['/sexos']), 1000);
          } else {
            this.notification.error('Erro ao atualizar sexo. Tente novamente.');
          }
        }
      });
    } else {
      this.sexoService.createSexo(this.sexo).subscribe({
        next: () => {
          this.notification.success('Sexo cadastrado com sucesso!');
          setTimeout(() => this.router.navigate(['/sexos']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar sexo', error);
          // Verifica se realmente houve erro ou se é apenas retorno vazio
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Sexo cadastrado com sucesso!');
            setTimeout(() => this.router.navigate(['/sexos']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar sexo. Tente novamente.');
          }
        }
      });
    }
  }
}
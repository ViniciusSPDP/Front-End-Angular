import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MarcaService, Marca } from '../../services/marca';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './marca-form.html',
  styleUrls: ['./marca-form.scss']
})
export class MarcaFormComponent implements OnInit {
  
  form: FormGroup;
  isEdit = false;
  marcaId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private marcaService: MarcaService,
    private notification: NotificationService
  ) {
    this.form = this.fb.group({
      nomemarca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.marcaId = +id;
      this.marcaService.getMarca(this.marcaId).subscribe(
        data => {
          this.form.patchValue(data);
        },
        error => {
          console.error('Erro ao carregar Marca', error);
          this.notification.error('Erro ao carregar dados da marca');
        }
      );
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.warning('Por favor, preencha o nome da marca');
      return;
    }

    const marca: Marca = {
      codmarca: this.marcaId,
      ...this.form.value
    };

    if (this.isEdit) {
      this.marcaService.updateMarca(this.marcaId!, marca).subscribe({
        next: () => {
          this.notification.success('Marca atualizada com sucesso!');
          setTimeout(() => this.router.navigate(['/marcas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar Marca', error);
          // Verifica se realmente houve erro ou se é apenas retorno vazio
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Marca atualizada com sucesso!');
            setTimeout(() => this.router.navigate(['/marcas']), 1000);
          } else {
            this.notification.error('Erro ao atualizar marca. Tente novamente.');
          }
        }
      });
    } else {
      this.marcaService.createMarca(marca).subscribe({
        next: () => {
          this.notification.success('Marca cadastrada com sucesso!');
          setTimeout(() => this.router.navigate(['/marcas']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar Marca', error);
          // Verifica se realmente houve erro ou se é apenas retorno vazio
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Marca cadastrada com sucesso!');
            setTimeout(() => this.router.navigate(['/marcas']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar marca. Tente novamente.');
          }
        }
      });
    }
  }
}
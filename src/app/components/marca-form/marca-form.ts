import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module'; 
import { MarcaService, Marca } from '../../services/marca';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MaterialModule],
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
    private snackBar: MatSnackBar 
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
        error => console.error('Erro ao carregar Marca', error)
      );
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, preencha o nome da marca.', 'Fechar', { duration: 3000 });
      return;
    }

    const marca: Marca = {
      codmarca: this.marcaId,
      ...this.form.value
    };

    const successAction = () => {
      this.snackBar.open(`Marca ${this.isEdit ? 'atualizada' : 'criada'} com sucesso!`, 'Fechar', { duration: 3000 });
      this.router.navigate(['/marcas']);
    };

    const errorAction = (error: any) => {
      console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'criar'} Marca`, error);
      this.snackBar.open(`Erro ao ${this.isEdit ? 'salvar' : 'criar'} marca.`, 'Fechar', { duration: 3000 });
    };

    if (this.isEdit) {
      this.marcaService.updateMarca(this.marcaId!, marca).subscribe(successAction, errorAction);
    } else {
      this.marcaService.createMarca(marca).subscribe(successAction, errorAction);
    }
  }
}
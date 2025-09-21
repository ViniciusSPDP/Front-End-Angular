import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TipoService, Tipo } from '../../services/tipo';

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
    private tipoService: TipoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoService.getTipo(+id).subscribe(
        data => this.tipo = data,
        error => console.error('Erro ao carregar Tipo', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.tipoService.updateTipo(this.tipo.codtipo!, this.tipo).subscribe(
        () => this.router.navigate(['/tipos']),
        error => console.error('Erro ao atualizar Tipo', error)
      );
    } else {
      this.tipoService.createTipo(this.tipo).subscribe(
        () => this.router.navigate(['/tipos']),
        error => console.error('Erro ao criar Tipo', error)
      );
    }
  }
}
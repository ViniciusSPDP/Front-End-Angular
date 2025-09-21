import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MarcaService, Marca } from '../../services/marca';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './marca-form.html',
  styleUrls: ['./marca-form.scss']
})
export class MarcaFormComponent implements OnInit {
  marca: Marca = { nomemarca: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.marcaService.getMarca(+id).subscribe(
        data => this.marca = data,
        error => console.error('Erro ao carregar Marca', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.marcaService.updateMarca(this.marca.codmarca!, this.marca).subscribe(
        () => this.router.navigate(['/marcas']),
        error => console.error('Erro ao atualizar Marca', error)
      );
    } else {
      this.marcaService.createMarca(this.marca).subscribe(
        () => this.router.navigate(['/marcas']),
        error => console.error('Erro ao criar Marca', error)
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarcaService, Marca } from '../../services/marca';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marca-list.html',
  styleUrls: ['./marca-list.scss']
})
export class MarcaListComponent implements OnInit {
  marcas: Marca[] = [];

  constructor(private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.loadMarcas();
  }

  loadMarcas(): void {
    this.marcaService.getMarcas().subscribe(
      data => this.marcas = data,
      error => console.error('Erro ao carregar Marcas', error)
    );
  }

  deleteMarca(id: number): void {
    if(confirm('Tem certeza que deseja excluir esta marca?')) {
      this.marcaService.deleteMarca(id).subscribe(
        () => this.loadMarcas(),
        error => console.error('Erro ao excluir Marca', error)
      );
    }
  }
}
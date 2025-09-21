import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-tipo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tipo-list.html',
  styleUrls: ['./tipo-list.scss']
})
export class TipoListComponent implements OnInit {
  tipos: Tipo[] = [];

  constructor(private tipoService: TipoService) { }

  ngOnInit(): void {
    this.loadTipos();
  }

  loadTipos(): void {
    this.tipoService.getTipos().subscribe(
      data => this.tipos = data,
      error => console.error('Erro ao carregar Tipos', error)
    );
  }

  deleteTipo(id: number): void {
    if(confirm('Tem certeza que deseja excluir este tipo?')) {
      this.tipoService.deleteTipo(id).subscribe(
        () => this.loadTipos(),
        error => console.error('Erro ao excluir Tipo', error)
      );
    }
  }
}
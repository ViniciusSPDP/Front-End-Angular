import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RuaService, Rua  } from '../../services/rua';

@Component({
  selector: 'app-rua-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rua-list.html',
  styleUrls: ['./rua-list.scss']
})
export class RuaListComponent implements OnInit {
  ruas: Rua[] = [];

  constructor(private ruaService: RuaService) { }

  ngOnInit(): void {
    this.loadRuas();
  }

  loadRuas(): void {
    this.ruaService.getRuas().subscribe(
      data => this.ruas = data,
      error => console.error('Erro ao carregar Ruas', error)
    );
  }

  deleteRua(id: number): void {
    if(confirm('Tem certeza que deseja excluir esta rua?')) {
      this.ruaService.deleteRua(id).subscribe(
        () => this.loadRuas(),
        error => console.error('Erro ao excluir Rua', error)
      );
    }
  }
}
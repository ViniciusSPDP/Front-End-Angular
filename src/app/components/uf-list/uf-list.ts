import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UfService, Uf } from '../../services/uf';

@Component({
  selector: 'app-uf-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './uf-list.html',
  styleUrls: ['./uf-list.scss']
})
export class UfListComponent implements OnInit {
  ufs: Uf[] = [];

  constructor(private ufService: UfService) { }

  ngOnInit(): void {
    this.loadUfs();
  }

  loadUfs(): void {
    this.ufService.getUfs().subscribe(
      data => this.ufs = data,
      error => console.error('Erro ao carregar UFs', error)
    );
  }

  deleteUf(id: number): void {
    if(confirm('Tem certeza que deseja excluir esta UF?')) {
      this.ufService.deleteUf(id).subscribe(
        () => this.loadUfs(),
        error => console.error('Erro ao excluir UF', error)
      );
    }
  }
}
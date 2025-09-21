import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SexoService, Sexo } from '../../services/sexo';
@Component({
  selector: 'app-sexo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sexo-list.html',
  styleUrls: ['./sexo-list.scss']
})
export class SexoListComponent implements OnInit {
  sexos: Sexo[] = [];
  constructor(private sexoService: SexoService) { }
  ngOnInit(): void {
    this.loadSexos();
  }
loadSexos(): void {
  this.sexoService.getSexos().subscribe(
    data => this.sexos = data,
    error => console.error('Erro ao carregar sexos', error)
  );
}
deleteSexo(id: number): void {
  if(confirm('Tem certeza que deseja excluir este sexo?')) {
  this.sexoService.deleteSexo(id).subscribe(
    () => this.loadSexos(),
    error => console.error('Erro ao excluir sexo', error)
  );
}
 }
}
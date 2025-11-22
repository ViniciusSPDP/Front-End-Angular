import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SexoService, Sexo } from '../../services/sexo';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-sexo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sexo-list.html',
  styleUrls: ['./sexo-list.scss']
})
export class SexoListComponent implements OnInit {
  sexos: Sexo[] = [];
  
  constructor(
    private sexoService: SexoService,
    private notification: NotificationService
  ) { }
  
  ngOnInit(): void {
    this.loadSexos();
  }

  loadSexos(): void {
    this.sexoService.getSexos().subscribe(
      data => this.sexos = data,
      error => {
        console.error('Erro ao carregar sexos', error);
        this.notification.error('Erro ao carregar a lista de sexos');
      }
    );
  }

  deleteSexo(id: number): void {
    if(confirm('Tem certeza que deseja excluir este sexo?')) {
      this.sexoService.deleteSexo(id).subscribe(
        () => {
          this.notification.success('Sexo excluído com sucesso!');
          this.loadSexos();
        },
        error => {
          console.error('Erro ao excluir sexo', error);
          if (error.status === 409 || error.status === 500) {
            this.notification.error('Não é possível excluir este sexo pois ele está associado a um ou mais clientes');
          } else {
            this.notification.error('Erro ao excluir sexo. Tente novamente.');
          }
        }
      );
    }
  }
}
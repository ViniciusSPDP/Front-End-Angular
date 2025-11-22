import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarcaService, Marca } from '../../services/marca';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marca-list.html',
  styleUrls: ['./marca-list.scss']
})
export class MarcaListComponent implements OnInit {
  marcas: Marca[] = [];
  
  constructor(
    private marcaService: MarcaService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadMarcas();
  }

  loadMarcas(): void {
    this.marcaService.getMarcas().subscribe(
      data => this.marcas = data,
      error => {
        console.error('Erro ao carregar Marcas', error);
        this.notification.error('Erro ao carregar a lista de marcas');
      }
    );
  }

  deleteMarca(id: number): void {
    if(confirm('Tem certeza que deseja excluir esta marca?')) {
      this.marcaService.deleteMarca(id).subscribe(
        () => {
          this.notification.success('Marca excluída com sucesso!');
          this.loadMarcas();
        },
        error => {
          console.error('Erro ao excluir Marca', error);
          if (error.status === 409 || error.status === 500) {
            this.notification.error('Não é possível excluir esta marca pois ela está associada a um ou mais produtos');
          } else {
            this.notification.error('Erro ao excluir marca. Tente novamente.');
          }
        }
      );
    }
  }
}
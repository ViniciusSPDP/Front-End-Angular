import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarcaService, Marca } from '../../services/marca';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog'; 
import { MarcaFormComponent } from '../marca-form/marca-form'; 

@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialModule],
  templateUrl: './marca-list.html',
  styleUrls: ['./marca-list.scss']
})
export class MarcaListComponent implements OnInit {
  marcas: Marca[] = [];
  
  constructor(
    private marcaService: MarcaService,
    public dialog: MatDialog, 
    private snackBar: MatSnackBar 
  ) { }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir esta marca?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.marcaService.deleteMarca(id).subscribe(
          () => {
            this.loadMarcas(); 
            this.snackBar.open('Marca excluída com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Erro ao excluir Marca', error);
            this.snackBar.open('Erro ao excluir marca.', 'Fechar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
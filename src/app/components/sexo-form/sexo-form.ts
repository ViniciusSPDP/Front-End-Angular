import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SexoService, Sexo } from '../../services/sexo';
@Component({
  selector: 'app-sexo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sexo-form.html',
  styleUrls: ['./sexo-form.scss']
})
export class SexoFormComponent implements OnInit {
  sexo: Sexo = { nomesexo: '' };
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sexoService: SexoService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.sexoService.getSexo(+id).subscribe(
        data => this.sexo = data,
        error => console.error('Erro ao carregar sexo', error)
      );
    }
  }
  onSubmit(): void {    
    if (this.isEdit) {
      this.sexoService.updateSexo(this.sexo.codsexo!, this.sexo).subscribe(
        () => this.router.navigate(['/sexos']),
        error => console.error('Erro ao atualizar sexo', error)
      );
    } else {
      this.sexoService.createSexo(this.sexo).subscribe(
        () => this.router.navigate(['/sexos']),
        error => console.error('Erro ao criar sexo', error)
      );
    }
  }
}
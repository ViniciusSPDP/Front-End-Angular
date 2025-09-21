import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BairroService, Bairro } from '../../services/bairro';
@Component({
  selector: 'app-bairro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bairro-form.html',
  styleUrls: ['./bairro-form.scss']
})
export class BairroFormComponent implements OnInit {
  bairro: Bairro = { nomebairro: '' };
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bairroService: BairroService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bairroService.getBairro(+id).subscribe(
        data => this.bairro = data,
        error => console.error('Erro ao carregar bairro', error)
      );
    }
  }
  onSubmit(): void {    
    if (this.isEdit) {
      this.bairroService.updateBairro(this.bairro.codbairro!, this.bairro).subscribe(
        () => this.router.navigate(['/bairros']),
        error => console.error('Erro ao atualizar bairro', error)
      );
    } else {
      this.bairroService.createBairro(this.bairro).subscribe(
        () => this.router.navigate(['/bairros']),
        error => console.error('Erro ao criar bairro', error)
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UfService, Uf } from '../../services/uf';

@Component({
  selector: 'app-uf-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './uf-form.html',
  styleUrls: ['./uf-form.scss']
})
export class UfFormComponent implements OnInit {
  uf: Uf = { nomeuf: '', siglauf: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ufService: UfService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ufService.getUf(+id).subscribe(
        data => this.uf = data,
        error => console.error('Erro ao carregar UF', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.ufService.updateUf(this.uf.coduf!, this.uf).subscribe(
        () => this.router.navigate(['/ufs']),
        error => console.error('Erro ao atualizar UF', error)
      );
    } else {
      this.ufService.createUf(this.uf).subscribe(
        () => this.router.navigate(['/ufs']),
        error => console.error('Erro ao criar UF', error)
      );
    }
  }
}
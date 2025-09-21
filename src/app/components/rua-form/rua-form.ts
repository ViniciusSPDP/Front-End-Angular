import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RuaService, Rua } from '../../services/rua';

@Component({
  selector: 'app-rua-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rua-form.html',
  styleUrls: ['./rua-form.scss']
})
export class RuaFormComponent implements OnInit {
  rua: Rua = { nomerua: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ruaService: RuaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ruaService.getRua(+id).subscribe(
        data => this.rua = data,
        error => console.error('Erro ao carregar Rua', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.ruaService.updateRua(this.rua.codrua!, this.rua).subscribe(
        () => this.router.navigate(['/ruas']),
        error => console.error('Erro ao atualizar Rua', error)
      );
    } else {
      this.ruaService.createRua(this.rua).subscribe(
        () => this.router.navigate(['/ruas']),
        error => console.error('Erro ao criar Rua', error)
      );
    }
  }
}
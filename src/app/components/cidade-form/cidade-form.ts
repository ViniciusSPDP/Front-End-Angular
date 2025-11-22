import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Cidade, CidadeService } from "../../services/cidade";
import { Uf, UfService } from "../../services/uf";
import { NotificationService } from "../../services/notification";

@Component({
    selector: "app-cidade-form",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: "./cidade-form.html",
    styleUrls: ["./cidade-form.scss"]
})

export class CidadeFormComponent implements OnInit {

    cidade: Cidade = { nomecidade: '', uf: {} as Uf };
    ufs: Uf[] = []
    isEdit = false;

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cidadeService: CidadeService,
    private ufService: UfService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

    this.loadUfs();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cidadeService.getCidade(+id).subscribe(
        data => this.cidade = data,
        error => {
          console.error('Erro ao carregar Cidade', error);
          this.notification.error('Erro ao carregar dados da cidade');
        }
      );
    }
  }

  loadUfs(): void {
    this.ufService.getUfs().subscribe(
      data => this.ufs = data,
      error => console.error('Erro ao carregar UFs', error)
    );
  }

  onSubmit(): void {
    // Validação manual
    if (!this.cidade.nomecidade || this.cidade.nomecidade.trim() === '' || !this.cidade.uf || !this.cidade.uf.coduf) {
      this.notification.warning('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const ufSelecionada = this.ufs.find(u => u.coduf == this.cidade.uf.coduf);
    if (ufSelecionada) {
      this.cidade.uf = ufSelecionada;
    }

    if (this.isEdit) {
      this.cidadeService.updateCidade(this.cidade.codcidade!, this.cidade).subscribe({
        next: () => {
          this.notification.success('Cidade atualizada com sucesso!');
          setTimeout(() => this.router.navigate(['/cidades']), 1000);
        },
        error: (error) => {
          console.error('Erro ao atualizar Cidade', error);
          if (error.status === 200 || error.status === 204) {
            this.notification.success('Cidade atualizada com sucesso!');
            setTimeout(() => this.router.navigate(['/cidades']), 1000);
          } else {
            this.notification.error('Erro ao atualizar cidade. Tente novamente.');
          }
        }
      });
    } else {
      this.cidadeService.createCidade(this.cidade).subscribe({
        next: () => {
          this.notification.success('Cidade cadastrada com sucesso!');
          setTimeout(() => this.router.navigate(['/cidades']), 1000);
        },
        error: (error) => {
          console.error('Erro ao criar Cidade', error);
          if (error.status === 200 || error.status === 201 || error.status === 204) {
            this.notification.success('Cidade cadastrada com sucesso!');
            setTimeout(() => this.router.navigate(['/cidades']), 1000);
          } else {
            this.notification.error('Erro ao cadastrar cidade. Tente novamente.');
          }
        }
      });
    }
  }
}
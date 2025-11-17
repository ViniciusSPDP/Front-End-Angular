import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Cidade, CidadeService } from "../../services/cidade";
import { Uf, UfService } from "../../services/uf";

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
    private ufService: UfService
  ) { }

  ngOnInit(): void {

    this.loadUfs();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cidadeService.getCidade(+id).subscribe(
        data => this.cidade = data,
        error => console.error('Erro ao carregar Cidade', error)
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
    const ufSelecionada = this.ufs.find(u => u.coduf == this.cidade.uf.coduf);
    if (ufSelecionada) {
      this.cidade.uf = ufSelecionada;
    }

    if (this.isEdit) {
      this.cidadeService.updateCidade(this.cidade.codcidade!, this.cidade).subscribe(
        () => this.router.navigate(['/cidades']),
        error => console.error('Erro ao atualizar Cidade', error)
      );
    } else {
      this.cidadeService.createCidade(this.cidade).subscribe(
        () => this.router.navigate(['/cidades']),
        error => console.error('Erro ao criar Cidade', error)
      );
    }
  }


}
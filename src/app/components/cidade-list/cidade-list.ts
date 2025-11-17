import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Cidade, CidadeService } from "../../services/cidade";

@Component({
    selector: "app-cidade-list",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./cidade-list.html",
    styleUrls: ["./cidade-list.scss"]
})

export class CidadeListComponent implements OnInit {
    cidades: Cidade[] = [];

    constructor(private cidadeService: CidadeService) {}

    ngOnInit(): void {
    this.loadCidades();
  }

  loadCidades(): void {
    this.cidadeService.getCidades().subscribe(
      data => this.cidades = data,
      error => console.error('Erro ao carregar Cidades', error)
    );
  }

  deleteCidade(id: number): void {
    if(confirm('Tem certeza que deseja excluir esta cidade?')) {
      this.cidadeService.deleteCidade(id).subscribe(
        () => this.loadCidades(),
        error => console.error('Erro ao excluir Cidade', error)
      );
    }
  }
}
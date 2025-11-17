import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService, Cliente } from '../../services/cliente';
import { SexoService, Sexo } from '../../services/sexo';
import { BairroService, Bairro } from '../../services/bairro';
import { CidadeService, Cidade } from '../../services/cidade';
import { RuaService, Rua } from '../../services/rua';
import { CepService, Cep } from '../../services/cep';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.scss'] 
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = {
    nomecliente: '',
    cpf: '',
    datanasc: '', 
    numerocasa: '',
    sexo: {} as Sexo,
    bairro: {} as Bairro,
    cidade: {} as Cidade,
    rua: {} as Rua,
    cep: {} as Cep
  };
  
  sexos: Sexo[] = [];
  bairros: Bairro[] = [];
  cidades: Cidade[] = [];
  ruas: Rua[] = [];
  ceps: Cep[] = [];

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private sexoService: SexoService,
    private bairroService: BairroService,
    private cidadeService: CidadeService,
    private ruaService: RuaService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.loadSexos();
    this.loadBairros();
    this.loadCidades();
    this.loadRuas();
    this.loadCeps();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clienteService.getCliente(+id).subscribe(
        data => {
          this.cliente = data;

          if (data.datanasc) {
            this.cliente.datanasc = new Date(data.datanasc).toISOString().split('T')[0];
          }
        },
        error => console.error('Erro ao carregar Cliente', error)
      );
    }
  }

  loadSexos(): void {
    this.sexoService.getSexos().subscribe(data => this.sexos = data);
  }
  loadBairros(): void {
    this.bairroService.getBairros().subscribe(data => this.bairros = data);
  }
  loadCidades(): void {
    this.cidadeService.getCidades().subscribe(data => this.cidades = data);
  }
  loadRuas(): void {
    this.ruaService.getRuas().subscribe(data => this.ruas = data);
  }
  loadCeps(): void {
    this.cepService.getCeps().subscribe(data => this.ceps = data);
  }

  onSubmit(): void {

    this.cliente.sexo = { codsexo: this.cliente.sexo.codsexo } as Sexo;
    this.cliente.bairro = { codbairro: this.cliente.bairro.codbairro } as Bairro;
    this.cliente.cidade = { codcidade: this.cliente.cidade.codcidade } as Cidade;
    this.cliente.rua = { codrua: this.cliente.rua.codrua } as Rua;
    this.cliente.cep = { codcep: this.cliente.cep.codcep } as Cep;

    if (this.isEdit) {
      this.clienteService.updateCliente(this.cliente.codcliente!, this.cliente).subscribe(
        () => this.router.navigate(['/clientes']),
        error => console.error('Erro ao atualizar Cliente', error)
      );
    } else {
      this.clienteService.createCliente(this.cliente).subscribe(
        () => this.router.navigate(['/clientes']),
        error => console.error('Erro ao criar Cliente', error)
      );
    }
  }
}
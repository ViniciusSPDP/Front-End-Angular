import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClienteService, Cliente } from '../../services/cliente';
import { SexoService, Sexo } from '../../services/sexo';
import { BairroService, Bairro } from '../../services/bairro';
import { CidadeService, Cidade } from '../../services/cidade';
import { RuaService, Rua } from '../../services/rua';
import { CepService, Cep } from '../../services/cep';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MaterialModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.scss']
})
export class ClienteFormComponent implements OnInit {

  form: FormGroup;
  
  sexos: Sexo[] = [];
  bairros: Bairro[] = [];
  cidades: Cidade[] = [];
  ruas: Rua[] = [];
  ceps: Cep[] = [];

  isEdit = false;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private sexoService: SexoService,
    private bairroService: BairroService,
    private cidadeService: CidadeService,
    private ruaService: RuaService,
    private cepService: CepService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nomecliente: ['', Validators.required],
      cpf: ['', Validators.required],
      datanasc: ['', Validators.required],
      numerocasa: ['', Validators.required],
      sexo: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      rua: [null, Validators.required],
      cep: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSexos();
    this.loadBairros();
    this.loadCidades();
    this.loadRuas();
    this.loadCeps();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clienteId = +id;
      this.clienteService.getCliente(this.clienteId).subscribe(
        data => {
          this.form.patchValue({
            ...data,
            datanasc: new Date(data.datanasc).toISOString().split('T')[0],
            sexo: data.sexo.codsexo,
            bairro: data.bairro.codbairro,
            cidade: data.cidade.codcidade,
            rua: data.rua.codrua,
            cep: data.cep.codcep
          });
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
    if (this.form.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    const formValue = this.form.value;
    const cliente: Cliente = {
      ...formValue,
      codcliente: this.clienteId,
      sexo: { codsexo: formValue.sexo },
      bairro: { codbairro: formValue.bairro },
      cidade: { codcidade: formValue.cidade },
      rua: { codrua: formValue.rua },
      cep: { codcep: formValue.cep }
    };

    const successAction = () => {
      this.snackBar.open(`Cliente ${this.isEdit ? 'atualizado' : 'criado'} com sucesso!`, 'Fechar', { duration: 3000 });
      this.router.navigate(['/clientes']);
    };

    const errorAction = (error: any) => {
      console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'criar'} Cliente`, error);
      this.snackBar.open(`Erro ao ${this.isEdit ? 'atualizar' : 'criar'} cliente.`, 'Fechar', { duration: 3000 });
    };

    if (this.isEdit) {
      this.clienteService.updateCliente(this.clienteId!, cliente).subscribe(successAction, errorAction);
    } else {
      this.clienteService.createCliente(cliente).subscribe(successAction, errorAction);
    }
  }
}
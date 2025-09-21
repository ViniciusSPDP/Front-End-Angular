// app.routes.ts - CORRIGIDO

import { Routes } from '@angular/router';
import { SexoListComponent } from './components/sexo-list/sexo-list';
import { SexoFormComponent } from './components/sexo-form/sexo-form';
import { BairroFormComponent } from './components/bairro-form/bairro-form';
import { BairroListComponent } from './components/bairro-list/bairro-list';
import { CepFormComponent } from './components/cep-form/cep-form';
import { CepListComponent } from './components/cep-list/cep-list';

export const routes: Routes = [
 { path: 'sexos', component: SexoListComponent },
 { path: 'sexos/novo', component: SexoFormComponent },
 { path: 'sexos/editar/:id', component: SexoFormComponent },

 { path: 'bairros', component: BairroListComponent },
 { path: 'bairros/novo', component: BairroFormComponent },
 { path: 'bairros/editar/:id', component: BairroFormComponent },

 { path: 'ceps', component: CepListComponent},
 { path: 'ceps/novo', component: CepFormComponent },
 { path: 'ceps/editar/:id', component: CepFormComponent },

 // A rota padrão já redireciona para /sexos. A duplicada foi removida.
 { path: '', redirectTo: '/sexos', pathMatch: 'full' },
];
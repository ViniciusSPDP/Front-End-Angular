// app.routes.ts - CORRIGIDO

import { Routes } from '@angular/router';
import { SexoListComponent } from './components/sexo-list/sexo-list';
import { SexoFormComponent } from './components/sexo-form/sexo-form';
import { BairroFormComponent } from './components/bairro-form/bairro-form';
import { BairroListComponent } from './components/bairro-list/bairro-list';
import { CepFormComponent } from './components/cep-form/cep-form';
import { CepListComponent } from './components/cep-list/cep-list';
import { MarcaListComponent } from './components/marca-list/marca-list';
import { MarcaFormComponent } from './components/marca-form/marca-form';
import { RuaFormComponent } from './components/rua-form/rua-form';
import { RuaListComponent } from './components/rua-list/rua-list';
import { TipoFormComponent } from './components/tipo-form/tipo-form';
import { TipoListComponent } from './components/tipo-list/tipo-list';
import { UfFormComponent } from './components/uf-form/uf-form';
import { UfListComponent } from './components/uf-list/uf-list';


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


 { path: 'marcas', component: MarcaListComponent },
 { path: 'marcas/novo', component: MarcaFormComponent },
 { path: 'marcas/editar/:id', component: MarcaFormComponent },

 { path: 'ruas', component: RuaListComponent },
 { path: 'ruas/novo', component: RuaFormComponent },
 { path: 'ruas/editar/:id', component: RuaFormComponent },

 { path: 'tipos', component: TipoListComponent },
 { path: 'tipos/novo', component: TipoFormComponent },
 { path: 'tipos/editar/:id', component: TipoFormComponent },

 { path: 'ufs', component: UfListComponent },
 { path: 'ufs/novo', component: UfFormComponent },
 { path: 'ufs/editar/:id', component: UfFormComponent },

 { path: '', redirectTo: '/sexos', pathMatch: 'full' },
];  
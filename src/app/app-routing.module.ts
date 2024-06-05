import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { HumanaComponent } from './humana/humana.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirige al dashboard por defecto
    { path: 'dashboard', component: DashboardComponent },
    { path: 'administracion', component: AdministracionComponent },
    { path: 'contabilidad', component: ContabilidadComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'inventarios', component: InventariosComponent },
    { path: 'mantenimiento', component: MantenimientoComponent },
    { path: 'humana', component: HumanaComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
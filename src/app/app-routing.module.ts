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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaProveedoresComponent } from './compras/lista-proveedores/lista-proveedores.component';
import { CotizacionComponent } from './compras/cotizacion/cotizacion.component';
import { OrdenesComprasComponent } from './compras/ordenes-compras/ordenes-compras.component';
import { SolicitudesSuministrosComponent } from './compras/solicitudes-suministros/solicitudes-suministros.component';
import { ConsultaInventarioComponent } from './inventarios/consulta-inventario/consulta-inventario.component';
import { MercanciaComponent } from './inventarios/mercancia/mercancia.component';
import { RecepcionMercanciaComponent } from './inventarios/recepcion-mercancia/recepcion-mercancia.component';

const routes: Routes = [
  { 
    path: '', 
    component: PrincipalComponent, 
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'administracion', component: AdministracionComponent },
      { path: 'contabilidad', component: ContabilidadComponent },
      { path: 'ventas', component: VentasComponent },
      { 
        path: 'compras', 
        component: ComprasComponent,
        children: [
          { path: 'listaproveedores', component: ListaProveedoresComponent },
          { path: 'cotizacion', component: CotizacionComponent },
          { path: 'ordenescompras', component: OrdenesComprasComponent },
          { path: 'solicitudessuministros', component: SolicitudesSuministrosComponent },
        ]
      },
      { path: 'inventarios',
         component: InventariosComponent,
         children: [
          { path: 'consultainventario', component: ConsultaInventarioComponent},
          { path: 'mercancia', component: MercanciaComponent},
          { path: 'recepcionmercancia', component: RecepcionMercanciaComponent},
         ]
         },
      { path: 'mantenimiento', component: MantenimientoComponent },
      { path: 'humana', component: HumanaComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
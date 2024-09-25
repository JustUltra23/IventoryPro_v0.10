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
import { GenerarVentaComponent } from './ventas/generar-venta/generar-venta.component';
import { ModFacturasComponent } from './ventas/mod-facturas/mod-facturas.component';
import { VentasAcumuladasComponent } from './ventas/ventas-acumuladas/ventas-acumuladas.component';
import { PQRComponent } from './humana/pqr/pqr.component';
import { InsumosComponent } from './mantenimiento/insumos/insumos.component';
import { MissolicitudesComponent } from './mantenimiento/missolicitudes/missolicitudes.component';
import { SolicitudmantenimientoComponent } from './mantenimiento/solicitudmantenimiento/solicitudmantenimiento.component';
import { ImpuestosComponent } from './contabilidad/impuestos/impuestos.component';
import { EstadosFinancierosComponent } from './contabilidad/estados-financieros/estados-financieros.component';
import { ConciliacionesComponent } from './contabilidad/conciliaciones/conciliaciones.component';
import { DatosEmpleadoComponent } from './humana/datos-empleado/datos-empleado.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { 
    path: '', 
    component: PrincipalComponent, 
    canActivate: [AuthGuard],  // Asegura que solo los usuarios autenticados accedan a estas rutas    
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'administracion', component: AdministracionComponent },
      { path: 'contabilidad', 
        component: ContabilidadComponent, 
        canActivate: [RoleGuard], // Aplicar RoleGuard
        data: { roles: [1,2,3,4,5,6,7,8] }, 
        children : [
          {path:'estados', component: EstadosFinancierosComponent},
          {path:'conciliaciones', component: ConciliacionesComponent},
          {path:'impuestos', component: ImpuestosComponent},
        ] 
      },
      { path: 'ventas', 
        component: VentasComponent, 
        children: [
          {path: 'generar_venta', component: GenerarVentaComponent},
          {path: 'modificacion_facturas', component: ModFacturasComponent},
          {path: 'ventas_acumuladas', component: VentasAcumuladasComponent},
        ]
      },
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
      { path: 'mantenimiento', 
        component: MantenimientoComponent,
        children: [
          {path: 'insumos', component: InsumosComponent},
          {path: 'solicitudesmantenimiento', component: SolicitudmantenimientoComponent},
          {path: 'missolicitudes', component: MissolicitudesComponent},
        ]
      },
      { path: 'humana', 
        component: HumanaComponent, 
        children: [
          {path: 'pqr', component: PQRComponent},
          {path:'datos', component: DatosEmpleadoComponent},
        ]
      },
      { path: 'usuarios', component: UsuariosComponent },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }  // Redirige a login si la ruta no coincide
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
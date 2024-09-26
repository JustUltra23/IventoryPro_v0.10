import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HeaderComponent } from './estructura/header/header.component';
import { NavComponent } from './estructura/nav/nav.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { HumanaComponent } from './humana/humana.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaProveedoresComponent } from './compras/lista-proveedores/lista-proveedores.component';
import { CotizacionComponent } from './compras/cotizacion/cotizacion.component';
import { OrdenesComprasComponent } from './compras/ordenes-compras/ordenes-compras.component';
import { SolicitudesSuministrosComponent } from './compras/solicitudes-suministros/solicitudes-suministros.component';
import { MercanciaComponent } from './inventarios/mercancia/mercancia.component';
import { ConsultaInventarioComponent } from './inventarios/consulta-inventario/consulta-inventario.component';
import { RecepcionMercanciaComponent } from './inventarios/recepcion-mercancia/recepcion-mercancia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenerarVentaComponent } from './ventas/generar-venta/generar-venta.component';
import { VentasAcumuladasComponent } from './ventas/ventas-acumuladas/ventas-acumuladas.component';
import { ModFacturasComponent } from './ventas/mod-facturas/mod-facturas.component';
import { SolicitudmantenimientoComponent } from './mantenimiento/solicitudmantenimiento/solicitudmantenimiento.component';
import { MissolicitudesComponent } from './mantenimiento/missolicitudes/missolicitudes.component';
import { InsumosComponent } from './mantenimiento/insumos/insumos.component';
import { DatosEmpleadoComponent } from './humana/datos-empleado/datos-empleado.component';
import { ConciliacionesComponent } from './contabilidad/conciliaciones/conciliaciones.component';
import { EstadosFinancierosComponent } from './contabilidad/estados-financieros/estados-financieros.component';
import { ImpuestosComponent } from './contabilidad/impuestos/impuestos.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PqrComponent } from './humana/pqr/pqr.component';
import { TiendasComponent } from './administracion/tiendas/tiendas.component';
import { RolesComponent } from './administracion/roles/roles.component';
import { SolicitudesComponent } from './administracion/solicitudes/solicitudes.component';
import { ReportesComponent } from './administracion/reportes/reportes.component';


@NgModule({
declarations: [
AppComponent,
HeaderComponent,
NavComponent,
FooterComponent,
PrincipalComponent,
DashboardComponent,
LoginComponent,
RegistroComponent,
AdministracionComponent,
ContabilidadComponent,
VentasComponent,
ComprasComponent,
InventariosComponent,
MantenimientoComponent,
HumanaComponent,
UsuariosComponent,
ListaProveedoresComponent,
CotizacionComponent,
OrdenesComprasComponent,
SolicitudesSuministrosComponent,
MercanciaComponent,
ConsultaInventarioComponent,
RecepcionMercanciaComponent,
GenerarVentaComponent,
VentasAcumuladasComponent,
ModFacturasComponent,
SolicitudmantenimientoComponent,
MissolicitudesComponent,
InsumosComponent,
PqrComponent,
DatosEmpleadoComponent,
ConciliacionesComponent,
EstadosFinancierosComponent,
ImpuestosComponent,
TiendasComponent,
RolesComponent,
SolicitudesComponent,
ReportesComponent

],
imports: [
BrowserModule,
AppRoutingModule,
FormsModule,
HttpClientModule,
ReactiveFormsModule,
IonicStorageModule.forRoot() //MICHAEL AQUI DEJO EL IONIC STORAGE PARA MANTENER LA SESION ABIERTA Y MAS ADELANTE PAL APK CRACK 23/09/2024
],
providers: [
provideHttpClient(withFetch()) // AQUI HABILITE EL FETCH, SI NO FUNCIONA SOLO ES BORRAR EL withFetch() Y ARRIBA TAMBIEN
],  
bootstrap: [AppComponent]
})
export class AppModule { }



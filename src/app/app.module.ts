import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
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
RecepcionMercanciaComponent
],
imports: [
BrowserModule,
AppRoutingModule,
FormsModule,
HttpClientModule
],
providers: [
provideHttpClient()
],  
bootstrap: [AppComponent]
})
export class AppModule { }



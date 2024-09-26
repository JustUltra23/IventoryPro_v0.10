import { Component } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.scss'
})
export class AdministracionComponent {
  
  mostrarComponente: string = '';

  mostrarTiendas() {
    this.mostrarComponente ='tiendas';
  }

  mostrarRoles() {
    this.mostrarComponente ='roles';
  }

  mostrarSolicitudes() {
    this.mostrarComponente ='solicitudes';
  }

  mostrarReportes() {
    this.mostrarComponente ='reportes';
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  mostrarComponente: string = '';

  mostrarListaProveedores() {
    this.mostrarComponente = 'listaProveedores';
  }

  mostrarCotizacion() {
    this.mostrarComponente = 'cotizacion';
  }

  mostrarOrdenesCompras() {
    this.mostrarComponente = 'ordenesCompras';
  }

  mostrarSolicitudesSuministros() {
    this.mostrarComponente = 'solicitudesSuministros';
  }
}

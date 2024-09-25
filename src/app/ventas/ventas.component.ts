import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  mostrarComponente: string = '';

  mostrarGenerarVenta(){
    this.mostrarComponente ='generar_venta';
  }

  mostrarModificacionFacturas(){
    this.mostrarComponente ='modificacion_facturas';
  }

  mostrarVentasAcumuladas(){
    this.mostrarComponente ='ventas_acumuladas';
  }
}


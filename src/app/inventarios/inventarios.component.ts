import { Component } from '@angular/core';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})
export class InventariosComponent {
  mostrarComponente: string = '';

  mostrarConsultaInventario(){
    this.mostrarComponente ='ConsultaInventario';
  }

  mostrarMercancia(){
    this.mostrarComponente ='mercancia';
  }

  mostrarRecepcionMercancia(){
    this.mostrarComponente ='recepcionmercancia';
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrl: './contabilidad.component.css'
})
export class ContabilidadComponent {
  mostrarComponente: string = '';

  mostrarConciliaciones(){
    this.mostrarComponente ='conciliaciones';
  }

  mostrarEstados(){
    this.mostrarComponente ='estados';
  }

  mostrarImpuestos(){
    this.mostrarComponente ='impuestos';
  }
}

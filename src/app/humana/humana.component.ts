import { Component } from '@angular/core';

@Component({
  selector: 'app-humana',
  templateUrl: './humana.component.html',
  styleUrl: './humana.component.css'
})
export class HumanaComponent {
  mostrarComponente: string = '';

  mostrarPQRS() {
    this.mostrarComponente = 'pqr';
  }

  mostrarDatosEmpleado() {
    this.mostrarComponente = 'datos';
  }
}

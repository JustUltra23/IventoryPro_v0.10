import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrl: './missolicitudes.component.scss'
})
export class MissolicitudesComponent implements OnInit{
  solicitudes: any[] = [];

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.mantenimientoService.obtenerSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });
  }

  editarSolicitud(solicitud: any) {
    // Lógica para editar la solicitud (posiblemente mostrar un formulario o modal)
  }

  eliminarSolicitud(id: number) {
    this.mantenimientoService.eliminarSolicitud(id).subscribe(() => {
      console.log('Solicitud eliminada');
      this.obtenerSolicitudes(); // Actualiza la lista después de eliminar
    });
  }
}


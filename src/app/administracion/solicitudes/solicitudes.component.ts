import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../servicios/administracion.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  solicitudSeleccionada: any = null;
  estados = ['Creada', 'Vista', 'Aceptada', 'Rechazada'];

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.administracionService.consultar().subscribe(data => {
      this.solicitudes = data;
    });
  }

  seleccionarSolicitud(solicitud: any): void {
    this.solicitudSeleccionada = solicitud;
  }

  actualizarEstado(): void {
    if (this.solicitudSeleccionada) {
      this.administracionService.editar(this.solicitudSeleccionada).subscribe(() => {
        this.cargarSolicitudes();
        this.solicitudSeleccionada = null;
      });
    }
  }
}

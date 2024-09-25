import { Component } from '@angular/core';
import { SolicitudesSuministrosService } from '../../servicios/solicitudes-suministros.service';

@Component({
  selector: 'app-solicitudes-suministros',
  templateUrl: './solicitudes-suministros.component.html',
  styleUrl: './solicitudes-suministros.component.scss'
})
export class SolicitudesSuministrosComponent {

  solicitudes: any[] = [];
  nuevaSolicitud = {
    fecha_solicitud: '',
    materiales: '',
  };
  solicitudParaEditar: any = null;

  constructor(private solicitudesService: SolicitudesSuministrosService) { }

  ngOnInit(): void {
    this.consultarSolicitudes();
  }

  consultarSolicitudes() {
    this.solicitudesService.consultarSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });
  }

  crearSolicitud() {
    this.solicitudesService.crearSolicitud(this.nuevaSolicitud).subscribe(() => {
      this.consultarSolicitudes();
      this.nuevaSolicitud = { fecha_solicitud: '', materiales: '' };
    });
  }

  aprobarSolicitud(id: number) {
    this.solicitudesService.aprobarSolicitud(id).subscribe(() => {
      this.consultarSolicitudes();
    });
  }

  cancelarSolicitud(id: number) {
    this.solicitudesService.cancelarSolicitud(id).subscribe(() => {
      this.consultarSolicitudes();
    });
  }
}
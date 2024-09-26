import { Component, OnInit } from '@angular/core';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.scss'
})
export class ImpuestosComponent implements OnInit{
  impuestos: any[] = [];
  impuesto: any = {
    id: null,
    tipo_impuesto: '',
    periodo_fiscal: '',
    monto_calculado: 0,
    fecha_vencimiento: '',
    estado: 'pendiente',
    usuario_id: null
  };

  constructor(
    private contabilidadService: ContabilidadService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerImpuestos();
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    try {
      const user = await this.authService.getUser();
      if (user) {
        this.impuesto.usuario_id = user.user_id;
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }

  obtenerImpuestos() {
    this.contabilidadService.obtenerImpuestos().subscribe(data => {
      this.impuestos = data;
    }, error => {
      console.error('Error al obtener impuestos:', error);
    });
  }

  guardarImpuesto() {
    if (this.impuesto.id) {
      this.contabilidadService.editarImpuesto(this.impuesto).subscribe(() => {
        this.obtenerImpuestos();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al editar impuesto:', error);
      });
    } else {
      this.contabilidadService.crearImpuesto(this.impuesto).subscribe(() => {
        this.obtenerImpuestos();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al crear impuesto:', error);
      });
    }
  }

  editarImpuesto(id: number) {
    const impuestoSeleccionado = this.impuestos.find(i => i.id === id);
    if (impuestoSeleccionado) {
      this.impuesto = { ...impuestoSeleccionado };
    }
  }

  eliminarImpuesto(id: number) {
    this.contabilidadService.eliminarImpuesto(id).subscribe(() => {
      this.obtenerImpuestos();
    }, error => {
      console.error('Error al eliminar impuesto:', error);
    });
  }

  limpiarFormulario() {
    this.impuesto = {
      id: null,
      tipo_impuesto: '',
      periodo_fiscal: '',
      monto_calculado: 0,
      fecha_vencimiento: '',
      estado: 'pendiente',
      usuario_id: this.impuesto.usuario_id
    };
  }
}

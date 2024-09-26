import { Component, OnInit } from '@angular/core';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-estados-financieros',
  templateUrl: './estados-financieros.component.html',
  styleUrl: './estados-financieros.component.scss'
})
export class EstadosFinancierosComponent implements OnInit {
  estadosFinancieros: any[] = [];
  tiendas: any[] = [];
  estadoFinanciero: any = {
    id: null,
    tipo_estado: '',
    fecha_generacion: '',
    fecha_inicio_periodo: '',
    fecha_fin_periodo: '',
    tienda_id: '',
    ingresos: 0,
    egresos: 0,
    utilidad_neta: 0,
    saldo_final: 0,
    usuario_id: null,
  };

  constructor(
    private contabilidadService: ContabilidadService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerEstadosFinancieros();
    this.obtenerTiendas();
    this.cargarDatosUsuario(); // Llama a este método
  }

  async cargarDatosUsuario() {
    try {
      const user = await this.authService.getUser(); // Asegúrate de que este método exista en AuthService
      if (user) {
        console.log('Usuario obtenido desde el AuthService:', user);
        this.estadoFinanciero.usuario_id = user.user_id; // Asignar el ID del usuario
        console.log('usuario_id asignado:', this.estadoFinanciero.usuario_id);
      } else {
        console.error('No se pudo obtener el usuario');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  obtenerTiendas() {
    this.contabilidadService.obtenerTiendas().subscribe(data => {
      this.tiendas = data;
    });
  }

  obtenerEstadosFinancieros() {
    this.contabilidadService.obtenerEstadosFinancieros().subscribe(data => {
      this.estadosFinancieros = data;
    }, error => {
      console.error('Error al obtener estados financieros:', error);
    });
  }

  guardarEstadoFinanciero() {
    console.log('Datos que se guardarán:', this.estadoFinanciero);
    if (this.estadoFinanciero.id) {
      this.contabilidadService.editarEstadoFinanciero(this.estadoFinanciero).subscribe(() => {
        this.obtenerEstadosFinancieros();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al editar estado financiero:', error);
      });
    } else {
      this.contabilidadService.crearEstadoFinanciero(this.estadoFinanciero).subscribe(() => {
        this.obtenerEstadosFinancieros();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al crear estado financiero:', error);
      });
    }
  }

  editarEstadoFinanciero(id: number) {
    const estadoSeleccionado = this.estadosFinancieros.find(e => e.id === id);
    if (estadoSeleccionado) {
      this.estadoFinanciero = { 
        ...estadoSeleccionado 
      };
    }
  }
  

  eliminarEstadoFinanciero(id: number) {
    this.contabilidadService.eliminarEstadoFinanciero(id).subscribe(() => {
      this.obtenerEstadosFinancieros();
    }, error => {
      console.error('Error al eliminar estado financiero:', error);
    });
  }

  limpiarFormulario() {
    this.estadoFinanciero = {
      id: null,
      tipo_estado: '',
      fecha_generacion: '',
      fecha_inicio_periodo: '',
      fecha_fin_periodo: '',
      tienda_id: '',
      ingresos: 0,
      egresos: 0,
      utilidad_neta: 0,
      saldo_final: 0,
      usuario_id: this.estadoFinanciero.usuario_id,
    };
  }
}

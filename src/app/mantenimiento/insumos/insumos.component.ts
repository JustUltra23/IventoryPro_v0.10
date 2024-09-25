import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent implements OnInit {
  insumo: any = {
    nombre_insumo: '',
    descripcion: '',
    cantidad: 0,
    precio_unitario: 0,
    proveedor: '',
    tienda_id: null
  };

  insumos: any[] = [];
  tiendas: any[] = [];
  editMode: boolean = false;

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void {
    this.consultarInsumos();
    this.obtenerTiendas();
  }

  // Cargar tiendas para el select
  obtenerTiendas(): void {
    this.mantenimientoService.obtenerTiendas().subscribe(
      (data) => {
        this.tiendas = data;
      },
      (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
    );
  }

  // Cargar insumos para la tabla
  consultarInsumos(): void {
    this.mantenimientoService.consultarInsumos().subscribe(
      (data) => {
        this.insumos = data;
      },
      (error) => {
        console.error('Error al obtener los insumos:', error);
      }
    );
  }

  // Guardar o actualizar un insumo
  guardarInsumo(): void {
    if (this.editMode) {
      // Actualizar insumo
      this.mantenimientoService.actualizarInsumo(this.insumo).subscribe(
        (response) => {
          console.log('Insumo actualizado:', response);
          this.resetForm();
          this.consultarInsumos();
        },
        (error) => {
          console.error('Error al actualizar el insumo:', error);
        }
      );
    } else {
      // Insertar nuevo insumo
      this.mantenimientoService.agregarInsumo(this.insumo).subscribe(
        (response) => {
          console.log('Insumo agregado:', response);
          this.resetForm();
          this.consultarInsumos();
        },
        (error) => {
          console.error('Error al agregar el insumo:', error);
        }
      );
    }
  }

  // Editar insumo
  editarInsumo(insumo: any): void {
    this.insumo = { ...insumo };
    this.editMode = true;
  }

  // Eliminar insumo
  eliminarInsumo(id: number): void {
    this.mantenimientoService.eliminarInsumo(id).subscribe(
      (response) => {
        console.log('Insumo eliminado:', response);
        this.consultarInsumos();
      },
      (error) => {
        console.error('Error al eliminar el insumo:', error);
      }
    );
  }

  // Obtener el nombre de la tienda por ID
  obtenerNombreTienda(tiendaId: number): string {
    const tienda = this.tiendas.find(t => t.id === tiendaId);
    return tienda ? tienda.nombre : 'Desconocida';
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.insumo = {
      nombre_insumo: '',
      descripcion: '',
      cantidad: 0,
      precio_unitario: 0,
      proveedor: '',
      tienda_id: null
    };
    this.editMode = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../servicios/compras.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrl: './lista-proveedores.component.scss'
})

export class ListaProveedoresComponent implements OnInit{
  proveedores: any[] = [];
  proveedorActual: any = null;
  creandoNuevo: boolean = false; // Nuevo campo para controlar si se está creando un nuevo proveedor

  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.comprasService.consultarProveedores().subscribe((data: any) => {
      this.proveedores = data;
    });
  }

  eliminarProveedor(id: number) {
    this.comprasService.eliminarProveedor(id).subscribe((response: any) => {
      if (response.resultado === 'Ok') {
        this.cargarProveedores();
      }
    });
  }

  mostrarFormularioEditar(proveedor: any) {
    this.proveedorActual = { ...proveedor };
    this.creandoNuevo = false; // No se está creando un nuevo proveedor
  }

  mostrarFormularioNuevo() {
    this.proveedorActual = {}; // Inicializar como un nuevo objeto proveedor vacío
    this.creandoNuevo = true; // Se está creando un nuevo proveedor
  }

  actualizarProveedor() {
    if (this.creandoNuevo) {
      this.comprasService.insertarProveedor(this.proveedorActual).subscribe((response: any) => {
        if (response.resultado === 'Ok') {
          this.cargarProveedores();
          this.proveedorActual = null;
          this.creandoNuevo = false;
        }
      });
    } else {
      this.comprasService.editarProveedor(this.proveedorActual).subscribe((response: any) => {
        if (response.resultado === 'Ok') {
          this.cargarProveedores();
          this.proveedorActual = null;
          this.creandoNuevo = false;
        }
      });
    }
  }

  cancelarEdicion() {
    this.proveedorActual = null;
    this.creandoNuevo = false;
  }
}
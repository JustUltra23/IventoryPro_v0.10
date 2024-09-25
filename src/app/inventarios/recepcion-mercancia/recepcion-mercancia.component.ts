  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { RecepcionMercanciaService } from '../../servicios/recepcion-mercancia.service';
  import { InventarioTiendasService } from '../../servicios/inventario-tiendas.service';


  @Component({
    selector: 'app-recepcion-mercancia',
    templateUrl: './recepcion-mercancia.component.html',
    styleUrl: './recepcion-mercancia.component.scss'
  })
  export class RecepcionMercanciaComponent implements OnInit {
    recepciones: any[] = [];
    tiendas: any[] = [];
    productos: any[] = [];
    recepcionActual: any = null;
    creandoNuevo = false;

    constructor(private recepcionService: RecepcionMercanciaService) { }

    ngOnInit(): void {
      this.cargarRecepciones();
      this.cargarTiendas();
      this.cargarProductos();
    }

    cargarRecepciones() {
      this.recepcionService.obtenerRecepciones().subscribe(recepciones => this.recepciones = recepciones);
    }

    cargarTiendas() {
      this.recepcionService.obtenerTiendas().subscribe(tiendas => this.tiendas = tiendas);
    }

    cargarProductos() {
      this.recepcionService.obtenerProductos().subscribe(productos => this.productos = productos);
    }

    mostrarFormularioNuevo() {
      this.creandoNuevo = true;
      this.recepcionActual = {
        tienda_id: null,
        producto_id: null,
        cantidad: null,
        fecha_recepcion: '',
        estado: ''
      };
    }

    mostrarFormularioEditar(recepcion: any) {
      this.creandoNuevo = false;
      this.recepcionActual = { ...recepcion };
    }

    guardarRecepcion() {
      if (this.creandoNuevo) {
        // Registrar nueva recepción (ya actualiza inventario internamente en PHP)
        this.recepcionService.registrarRecepcion(this.recepcionActual).subscribe(() => {
          this.cargarRecepciones(); // Actualizar la lista de recepciones
          this.recepcionActual = null; // Limpiar el formulario
        }, error => {
          console.error("Error al registrar recepción: ", error);
        });
      } else {
        // Editar recepción existente (también actualiza el inventario según la diferencia)
        this.recepcionService.editarRecepcion(this.recepcionActual).subscribe(() => {
          this.cargarRecepciones(); // Actualizar la lista de recepciones
          this.recepcionActual = null; // Limpiar el formulario
        }, error => {
          console.error("Error al editar recepción: ", error);
        });
      }
    }
    
    eliminarRecepcion(id: number) {
      this.recepcionService.eliminarRecepcion(id).subscribe(() => {
        this.cargarRecepciones();
      });
    }

    cancelarEdicion() {
      this.recepcionActual = null;
    }
  }
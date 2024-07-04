import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';


@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.scss'
})
export class MercanciaComponent implements OnInit{
  productos: any[] = [];
  productoActual: any = null;
  creandoNuevo: boolean = false;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos(): void {
    this.productosService.consultarProductos().subscribe(
      (response: any) => {
        this.productos = response;
      },
      (error) => {
        console.error('Error al consultar productos:', error);
      }
    );
  }

  mostrarFormularioEditar(producto: any): void {
    this.productoActual = { ...producto };
    this.creandoNuevo = false;
  }

  mostrarFormularioNuevo(): void {
    this.productoActual = {}; // Nuevo objeto producto vacío
    this.creandoNuevo = true;
  }

  guardarProducto(): void {
    if (this.creandoNuevo) {
      // Crear nuevo producto
      this.productosService.insertarProducto(this.productoActual).subscribe(
        (response: any) => {
          if (response.resultado === 'Ok') {
            console.log('Producto creado correctamente:', response);
            this.obtenerProductos();
            this.productoActual = null;
            this.creandoNuevo = false;
          }
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    } else {
      // Actualizar producto existente
      this.productosService.editarProducto(this.productoActual).subscribe(
        (response: any) => {
          if (response.resultado === 'Ok') {
            console.log('Producto actualizado correctamente:', response);
            this.obtenerProductos();
            this.productoActual = null;
            this.creandoNuevo = false;
          }
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    }
  }

  eliminarProducto(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(
      (response: any) => {
        if (response.resultado === 'Ok') {
          console.log('Producto eliminado correctamente:', response);
          this.obtenerProductos();
        }
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }

  cancelarEdicion(): void {
    this.productoActual = null;
    this.creandoNuevo = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { TiendasService } from '../../servicios/tiendas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.scss'
})
export class TiendasComponent implements OnInit {
  tiendas: any[] = [];
  tienda: any = { id: null, nombre: '', direccion: '' };

  constructor(private tiendasService: TiendasService) {}

  ngOnInit(): void {
    this.obtenerTiendas();
  }

  // Obtener todas las tiendas
  obtenerTiendas(): void {
    this.tiendasService.consultar().subscribe(data => {
      this.tiendas = data;
    });
  }

  // Guardar nueva tienda o editar tienda existente
  guardarTienda(): void {
    if (this.tienda.id) {
      // Editar tienda existente
      this.tiendasService.editar(this.tienda).subscribe(() => {
        this.obtenerTiendas();
        this.resetFormulario();
      });
    } else {
      // Insertar nueva tienda
      this.tiendasService.insertar(this.tienda).subscribe(() => {
        this.obtenerTiendas();
        this.resetFormulario();
      });
    }
  }

  // Editar una tienda (cargar datos en el formulario)
  editarTienda(t: any): void {
    this.tienda = { ...t };
  }

  // Eliminar una tienda
  eliminarTienda(id: number): void {
    this.tiendasService.eliminar(id).subscribe(() => {
      this.obtenerTiendas();
    });
  }

  // Resetear el formulario
  resetFormulario(): void {
    this.tienda = { id: null, nombre: '', direccion: '' };
  }
}

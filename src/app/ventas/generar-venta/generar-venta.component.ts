import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';


@Component({
  selector: 'app-generar-venta',
  templateUrl: './generar-venta.component.html',
  styleUrls: ['./generar-venta.component.scss']
})
export class GenerarVentaComponent implements OnInit {
  tiendas: any[] = [];
  producto: any = null;
  vendedor: any = null; // Para almacenar los datos del vendedor
  productosVenta: { ean: string; nombre: string; precio: number; cantidad: number; total: number; producto_id: number }[] = [];
  ean: string = '';
  cantidad: number = 1;
  fechaHora: string = '';
  tiendaSeleccionada: number | null = null;
  clienteIdentificacion: string = '';
  nombreCliente: string = '';
  celularCliente: string = '';
  emailCliente: string = '';
  identificacionVendedor: string = ''; // Para la identificación del vendedor
  clienteExiste: boolean = false; //Declarar si el Cliente Existe

  constructor(private ventasService: VentasService) { }

  ngOnInit() {
    this.obtenerTiendas();
    this.fechaHora = new Date().toISOString().split('T')[0];  // Solo la fecha en formato YYYY-MM-DD
  }

  obtenerTiendas() {
    this.ventasService.obtenerTiendas().subscribe(tiendas => {
      this.tiendas = tiendas;
    });
  }

  buscarVendedor() {
    this.ventasService.buscarVendedor(this.identificacionVendedor).subscribe(response => {
      if (response.resultado === 'Ok') {
        this.vendedor = response.vendedor;
      } else {
        alert(response.mensaje);
        this.vendedor = null;
      }
    });
  }

  buscarProductoPorEAN() {
    this.ventasService.buscarProducto(this.ean).subscribe(response => {
      if (response.resultado === 'Ok') {
        this.producto = response.producto;
      } else {
        alert(response.mensaje);
        this.producto = null;
      }
    });
  }

  agregarProducto() {
    if (this.producto && this.cantidad > 0) {
      const total = this.producto.precio * this.cantidad;
      this.productosVenta.push({
        ean: this.producto.ean,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        cantidad: this.cantidad,
        total: total,
        producto_id: this.producto.id  // Asegúrate de tener esto aquí
      });
      this.ean = '';
      this.cantidad = 1;
      this.producto = null; // Clear selected product
    }
  }

  calcularSubtotal(): number {
    return this.productosVenta.reduce((acc, item) => acc + item.total, 0);
  }

  calcularTotalVenta(): number {
    const subtotal = this.calcularSubtotal();
    const iva = subtotal * 0.19;  // Assuming 19% IVA
    return subtotal + iva;
  }

  eliminarProducto(item: { ean: string; nombre: string; precio: number; cantidad: number; total: number; producto_id: number }) {
    this.productosVenta = this.productosVenta.filter(p => p.ean !== item.ean);
  }

  buscarCliente() {
    this.ventasService.buscarCliente(this.clienteIdentificacion).subscribe(response => {
      if (response.existe) {
        // Si el cliente existe, rellena los campos
        this.nombreCliente = response.cliente.nombre;
        this.celularCliente = response.cliente.celular;
        this.emailCliente = response.cliente.email;
        this.clienteExiste = true; // Marcar como existente
      } else {
        // Si no existe, permite que el usuario rellene los datos
        this.clienteExiste = false; // Marcar como nuevo
        alert(response.message); // Mensaje para cliente nuevo
      }
    });
  }
  
  crearCliente() {
    const nuevoCliente = {
      identificacion: this.clienteIdentificacion,
      nombre: this.nombreCliente,
      celular: this.celularCliente,
      email: this.emailCliente
    };
  
    this.ventasService.crearCliente(nuevoCliente).subscribe(response => {
      if (response.exito) {
        alert('Cliente creado exitosamente.');
        this.clienteExiste = true;
      } else {
        alert('Error al crear el cliente: ' + response.message);
      }
    });
  }
  
  registrarVenta() {
    if (!this.clienteExiste && (this.nombreCliente && this.celularCliente && this.emailCliente)) {
      // Crear el cliente antes de registrar la venta si es nuevo
      this.crearCliente();
    }
  
    const venta = {
      tienda_id: this.tiendaSeleccionada,
      fecha: this.fechaHora,
      cliente: {
        identificacion: this.clienteIdentificacion,
        nombre: this.nombreCliente,
        celular: this.celularCliente,
        email: this.emailCliente
      },
      vendedor_id: this.vendedor?.id || null,
      productos: this.productosVenta
    };
  
    this.ventasService.registrarVenta(venta).subscribe(response => {
      console.log('Venta registrada', response);
  
      // Mostrar mensaje de éxito
      alert('VENTA REALIZADA EXITOSAMENTE');
  
      // Reiniciar el formulario
      this.resetFormulario();
    });
  }
  
  // Función para reiniciar el formulario
  resetFormulario() {
    this.tiendaSeleccionada = null;
    this.clienteIdentificacion = '';
    this.nombreCliente = '';
    this.celularCliente = '';
    this.emailCliente = '';
    this.vendedor = null;
    this.productosVenta = [];
    this.ean = '';
    this.cantidad = 1;
  }
}
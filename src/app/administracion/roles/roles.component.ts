import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../servicios/administracion.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit{
  roles: any[] = [];
  rol: any = {
    id: null,
    nombre: ''
  };

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.consultarRoles();
  }

  consultarRoles(): void {
    this.administracionService.consultarRoles().subscribe(data => {
      this.roles = data;
    });
  }

  guardarRol(): void {
    if (this.rol.id) {
      // Editar rol
      this.administracionService.editarRol(this.rol).subscribe(() => {
        this.consultarRoles();
        this.resetRol();
      });
    } else {
      // Crear rol
      this.administracionService.insertarRol(this.rol).subscribe(() => {
        this.consultarRoles();
        this.resetRol();
      });
    }
  }

  editarRol(rol: any): void {
    this.rol = { ...rol };
  }

  eliminarRol(id: number): void {
    this.administracionService.eliminarRol(id).subscribe(() => {
      this.consultarRoles();
    });
  }

  resetRol(): void {
    this.rol = { id: null, nombre: '' };
  }
}

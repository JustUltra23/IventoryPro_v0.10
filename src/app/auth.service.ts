import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private storageInitialized = false;
  private url = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/usuario/login.php';
  private roleSubject = new BehaviorSubject<number | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageInitialized = true;
    this.checkInitialLoginState();
  }

  async login(email: string, password: string) {
    try {
      const response: any = await this.http.post(this.url, { email, password }).toPromise();

      if (response && response.user_id && response.identificacion && response.rol_id) {  //25/09/2024 AGREGUE RESPONSE ID E IDENTIFICACION PARA QUE GUARDE DEL USUARIO
        await this.storage.set('user', response);
        console.log('Ingreso Exitoso, ID de Rol Almacenado:', response.rol_id);
        this.setLoggedIn(true, response.rol_id);
      } else {
        console.error('Error al iniciar sesión. Rol no encontrado.');
        throw new Error('Error al iniciar sesión. Rol no encontrado.');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  }

    /*async login(email: string, password: string) {
      // Define los encabezados HTTP
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <token>', // Si tienes un token o cualquier otro encabezado, agrégalo aquí
      });
    
      try {
        // Incluye los encabezados en la solicitud HTTP
        const response: any = await this.http.post(this.url, { email, password }, { headers }).toPromise();
    
        if (response && response.user_id && response.identificacion && response.rol_id) {  
          await this.storage.set('user', response);
          console.log('Ingreso Exitoso, ID de Rol Almacenado:', response.rol_id);
          this.setLoggedIn(true, response.rol_id);
        } else {
          console.error('Error al iniciar sesión. Rol no encontrado.');
          throw new Error('Error al iniciar sesión. Rol no encontrado.');
        }
      } catch (error) {
        console.error('Error en la solicitud de login:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
      }
    } */
    

  setLoggedIn(status: boolean, roleId: number | null = null) {
    if (this.storageInitialized) {
      this.storage.set('isLoggedIn', status).then(() => {
        this.isLoggedInSubject.next(status);

        if (roleId !== null) {
          console.log('ID rol Almacenado:', roleId);
          this.storage.set('userRole', roleId).then(() => {
            this.roleSubject.next(roleId);
          });
        } else {
          this.roleSubject.next(null);
        }
      });
    }
  }

  async logout() {
    if (this.storageInitialized) {
      await this.storage.remove('isLoggedIn');
      await this.storage.remove('userRole');
      this.isLoggedInSubject.next(false);
      this.roleSubject.next(null);
    }
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.storageInitialized) {
        this.storage.get('isLoggedIn').then((value) => {
          const isLoggedIn = value ? true : false; // Actualiza el valor
          this.isLoggedInSubject.next(isLoggedIn); // Notifica el cambio
          resolve(isLoggedIn); // Resuelve la promesa
        });
      } else {
        resolve(false); // Si no está inicializado, considera que no está autenticado
      }
    });
  }

  // FUNCION PARA TRAER EL USER
  async getUser(): Promise<any> {
  if (this.storageInitialized) {
    return await this.storage.get('user'); // Devuelve el objeto del usuario
  }
  return null;
  }
  

  async checkInitialLoginState() {
    if (this.storageInitialized) {
      const isLoggedIn = await this.storage.get('isLoggedIn');
      const userRole = await this.storage.get('userRole');

      if (isLoggedIn) {
        this.isLoggedInSubject.next(true);
        if (userRole !== null) {
          this.roleSubject.next(userRole);
        }
      }
    }
  }

  getUserRole(): Promise<number | null> {
    return new Promise((resolve) => {
      if (this.storageInitialized) {
        this.storage.get('userRole').then((role) => {
          console.log('Retrieved user role from storage:', role);
          // Asegurarse de que el rol es un número
          const parsedRole = role !== null ? Number(role) : null;
          resolve(parsedRole);
        });
      } else {
        resolve(null); // Si no está inicializado, devolver null
      }
    });
  }
  
  
}



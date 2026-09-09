import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Usuario {
  id: number;
  nombreCompleto: string;
  documento: {
    tipo: string;
    numero: string;
  };
  LugarNacimiento: {
    pais: string;
    ciudad: string;
  };
  fecha: string;
  numero: string;
  datospersonales: boolean;
  fechaRegistro: string;
}

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  nombre = '';
  apellido = '';
  pais = '';
  ciudad = '';
  tipo_documento = '';
  numero_de_identificacion = '';
  fecha_de_nacimiento = '';
  numero_de_celular = '';
  datos_personales = false;

  ultimoUsuario = signal<Usuario | null>(null);

  guardarUsuario() {
    if (!this.datos_personales) {
      alert('Debe aceptar la política de datos personales');
      return;
    }

    const usuarioCreado: Usuario = {
      id: Date.now(),
      nombreCompleto: `${this.nombre} ${this.apellido}`,
      LugarNacimiento: {
        pais: this.pais,
        ciudad: this.ciudad
      },
      documento: {
        tipo: this.tipo_documento,
        numero: this.numero_de_identificacion
      },
      fecha: this.fecha_de_nacimiento,
      numero: this.numero_de_celular,
      datospersonales: this.datos_personales,
      fechaRegistro: new Date().toLocaleDateString()
    };

    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));
    this.ultimoUsuario.set(usuarioCreado);
  }
}



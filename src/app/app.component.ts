import { Component, ViewChild } from '@angular/core';
import { CargoData } from './components/cargo/model/cargo-data';
import { PerfilData } from './components/perfil/model/perfil-data';
import { UsuarioComponent } from './components/usuario/usuario.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(UsuarioComponent)
  usuarioComponent!: UsuarioComponent;

  listaCargos: CargoData[] = [];
  listaPerfis: PerfilData[] = [];

  onListarCargos(cargos: CargoData[]) {
    this.listaCargos = cargos;
    this.usuarioComponent.listarUsuarios();
  }

  onListarPerfis(perfis: PerfilData[]) {
    this.listaPerfis = perfis;
    this.usuarioComponent.listarUsuarios();
  }
}

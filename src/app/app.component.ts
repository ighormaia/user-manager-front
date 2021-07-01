import { Component } from '@angular/core';
import { CargoData } from './components/cargo/model/cargo-data';
import { PerfilData } from './components/perfil/model/perfil-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-manager-front';

  listaCargos: CargoData[] = [];
  listaPerfis: PerfilData[] = [];

  onListarCargos(cargos: CargoData[]) {
    this.listaCargos = cargos;
  }

  onListarPerfis(perfis: PerfilData[]) {
    this.listaPerfis = perfis;
  }
}

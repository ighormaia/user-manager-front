import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/subscriptionManager';
import { CargoData } from '../cargo/model/cargo-data';
import { GeneroEnum } from '../../shared/model/genero-enum';
import { PerfilData } from '../perfil/model/perfil-data';
import { UsuarioData } from './model/usuario-data';
import { UsuarioService } from './usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'usuario-component',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})

export class UsuarioComponent implements OnInit, OnDestroy {

  private subscription = new SubscriptionManager<Subscription>();

  @Input() listaCargos: CargoData[] = [];
  @Input() listaPerfis: PerfilData[] = [];

  usuarioSendoEditado: UsuarioData = new UsuarioData;
  form: FormGroup;
  displayedColumns: string[] = ['nome', 'cpf', 'sexo','dataNascimento', 'dataCadastro', 'cargo', 'perfis', 'ações'];
  listaUsuarios: UsuarioData[] = [];
  generoEnum = GeneroEnum;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private notificacaoService: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: [
        '',
        Validators.required,
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(11)
        ]
      ],
      dataNascimento: undefined,
      sexo: '',
      cargo: [
        undefined,
        Validators.required
      ],
      perfis: undefined
    });
  }

  get ehEdicao(): boolean {
    return this.usuarioSendoEditado.idUsuario !== undefined ? true : false;
  }

  get desativarBotaoSalvar(): boolean {
    return this.form.invalid ? true : false
  }

  ngOnInit() {
    this.listarUsuarios();
  }

  ngOnDestroy() {
    this.subscription.destroy();
  }

  private exibirNotificacaoErro(message: string) {
    this.notificacaoService.open(message, 'fechar', {
      duration: 10000
    });
  }

  listarUsuarios() {
    this.subscription.add(
      this.usuarioService
        .getUsuarios()
        .subscribe(resp => {
          this.listaUsuarios = resp;
        })
    )
  }

  private preencherUsuarioData(): UsuarioData {
    let usuario = new UsuarioData();
    usuario.nome = this.form.get('nome')?.value;
    usuario.cpf = this.form.get('cpf')?.value;
    usuario.dataNascimento = this.form.get('dataNascimento')?.value;
    usuario.sexo = this.form.get('sexo')?.value;
    usuario.cargo = this.listaCargos.find(x => x.idCargo === this.form.get('cargo')?.value);
    usuario.perfis = this.form.get('perfis')?.value;
    return usuario;
  }

  adicionarUsuario() {
    let usuario = this.preencherUsuarioData();

    this.subscription.add(
      this.usuarioService
        .postUsuario(usuario)
        .subscribe(
          () => {
            this.listarUsuarios();
            this.form.reset();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  alterarUsuario() {
    let usuario = this.preencherUsuarioData();
    usuario.idUsuario = this.usuarioSendoEditado.idUsuario;

    this.subscription.add(
      this.usuarioService
        .putUsuario(usuario)
        .subscribe(
          () => {
            this.listarUsuarios();
            this.usuarioSendoEditado = new UsuarioData();
            this.form.reset();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  apagarUsuario(id: number) {
    this.subscription.add(
      this.usuarioService
        .deleteUsuario(id)
        .subscribe(
          () => {
            this.listarUsuarios();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  editarUsuario(usuario: UsuarioData) {
    this.usuarioSendoEditado = usuario;
    this.form.get('nome')?.setValue(usuario.nome);
    this.form.get('cpf')?.setValue(usuario.cpf)
    this.form.get('dataNascimento')?.setValue(usuario.dataNascimento);
    this.form.get('sexo')?.setValue(usuario.sexo);
    this.form.get('cargo')?.setValue(usuario.cargo?.idCargo);
    this.form.get('perfis')?.setValue(usuario.perfis);
  }

  compararObjetoSelect(x: PerfilData, y: PerfilData): boolean {
    return x && y ? x.idPerfil === y.idPerfil : x === y;
  }

  cancelar() {
    this.form.reset();
    this.usuarioSendoEditado = new UsuarioData();
  }

}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/subscriptionManager';
import { PerfilData } from './model/perfil-data';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'perfil-component',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})

export class PerfilComponent implements OnInit, OnDestroy {

  private subscription = new SubscriptionManager<Subscription>();

  @Output()
  onListarPerfis = new EventEmitter<PerfilData[]>();

  perfilSendoEditado: PerfilData = new PerfilData;
  form: FormGroup;
  displayedColumns: string[] = ['nome', 'acoes'];
  listaPerfis: PerfilData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private notificacaoService: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: [
        '',
        Validators.required,
      ]
    });
  }

  get ehEdicao(): boolean {
    return this.perfilSendoEditado.idPerfil !== undefined ? true : false;
  }

  get desativarBotaoSalvar(): boolean {
    return this.form.invalid ? true : false
  }

  ngOnInit() {
    this.listarPerfis();
  }

  ngOnDestroy() {
    this.subscription.destroy();
  }

  private exibirNotificacaoErro(message: string) {
    this.notificacaoService.open(message, 'fechar', {
      duration: 10000
    });
  }

  private listarPerfis() {
    this.subscription.add(
      this.perfilService
        .getPerfis()
        .subscribe(resp => {
          this.listaPerfis = resp;
          this.onListarPerfis.emit(resp);
        })
    )
  }

  adicionarPerfil() {
    let perfil = new PerfilData();
    perfil.nome = this.form.get('nome')?.value;

    this.subscription.add(
      this.perfilService
        .postPerfil(perfil)
        .subscribe(
          () => {
            this.listarPerfis();
            this.form.reset();
          },
          err => {
            this.exibirNotificacaoErro(err.message);
          }
        )
    )
  }

  alterarPerfil() {
    let perfil = new PerfilData();
    perfil.idPerfil = this.perfilSendoEditado.idPerfil;
    perfil.nome = this.form.get('nome')?.value;

    this.subscription.add(
      this.perfilService
        .putPerfil(perfil)
        .subscribe(
          () => {
            this.listarPerfis();
            this.perfilSendoEditado = new PerfilData();
            this.form.reset();
          },
          err => {
            this.exibirNotificacaoErro(err.message);
          }
        )
    )
  }

  apagarPerfil(id: number) {
    this.subscription.add(
      this.perfilService
        .deletePerfil(id)
        .subscribe(
          () => {
            this.listarPerfis();
          },
          err => {
            this.exibirNotificacaoErro(err.message);
          }
        )
    )
  }

  editarPerfil(perfil: PerfilData) {
    this.perfilSendoEditado = perfil;
    this.form.get('nome')?.setValue(perfil.nome);
  }

  cancelar() {
    this.form.reset();
    this.perfilSendoEditado = new PerfilData();
  }

}

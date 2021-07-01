import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/subscriptionManager';
import { CargoService } from './cargo.service';
import { CargoData } from './model/cargo-data';

@Component({
  selector: 'cargo-component',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
})

export class CargoComponent implements OnInit, OnDestroy {

  private subscription = new SubscriptionManager<Subscription>();

  @Output()
  onListarCargos = new EventEmitter<CargoData[]>();

  cargoSendoEditado: CargoData = new CargoData;
  form: FormGroup;
  displayedColumns: string[] = ['nome', 'acoes'];
  listaCargos: CargoData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cargoService: CargoService,
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
    return this.cargoSendoEditado.idCargo !== undefined ? true : false;
  }

  get desativarBotaoSalvar(): boolean {
    return this.form.invalid ? true : false
  }

  ngOnInit() {
    this.listarCargos();
  }

  ngOnDestroy() {
    this.subscription.destroy();
  }

  private exibirNotificacaoErro(message: string) {
    this.notificacaoService.open(message, 'fechar', {
      duration: 10000
    });
  }

  private listarCargos() {
    this.subscription.add(
      this.cargoService
        .getCargos()
        .subscribe(resp => {
          this.listaCargos = resp;
          this.onListarCargos.emit(resp);
        })
    )
  }

  adicionarCargo() {
    let cargo = new CargoData();
    cargo.nome = this.form.get('nome')?.value;

    this.subscription.add(
      this.cargoService
        .postCargo(cargo)
        .subscribe(
          () => {
            this.listarCargos();
            this.form.reset();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  alterarCargo() {
    let cargo = new CargoData();
    cargo.idCargo = this.cargoSendoEditado.idCargo;
    cargo.nome = this.form.get('nome')?.value;

    this.subscription.add(
      this.cargoService
        .putCargo(cargo)
        .subscribe(
          () => {
            this.listarCargos();
            this.cargoSendoEditado = new CargoData();
            this.form.reset();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  apagarCargo(id: number) {
    this.subscription.add(
      this.cargoService
        .deleteCargo(id)
        .subscribe(
          () => {
            this.listarCargos();
          },
          (err: HttpErrorResponse) => {
            this.exibirNotificacaoErro(err.error.message);
          }
        )
    )
  }

  editarCargo(cargo: CargoData) {
    this.cargoSendoEditado = cargo;
    this.form.get('nome')?.setValue(cargo.nome);
  }

  cancelar() {
    this.form.reset();
    this.cargoSendoEditado = new CargoData();
  }

}

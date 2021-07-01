import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SubscriptionManager } from 'src/app/shared/subscriptionManager';
import { CargoService } from './cargo.service';
import { CargoData } from './model/cargo-data';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'cargo-component',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
})

export class CargoComponent implements OnInit, OnDestroy {

  private subscription = new SubscriptionManager<Subscription>();
  cargoSendoEditado: CargoData = new CargoData;
  form: FormGroup;
  displayedColumns: string[] = ['nome', 'ações'];
  listaCargos: CargoData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cargoService: CargoService,
    private notificacaoService: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: ''
    });
  }

  get ehEdicao(): boolean {
    return this.cargoSendoEditado.idCargo !== undefined ? true : false;
  }

  ngOnInit() {
    this.listarCargos();
  }

  ngOnDestroy() {
    this.subscription.destroy();
  }

  nomeFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

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
          },
          err => {
            this.exibirNotificacaoErro(err.message);
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
          },
          err => {
            this.exibirNotificacaoErro(err.message);
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
          err => {
            this.exibirNotificacaoErro(err.message);
          }
        )
    )
  }

  editarCargo(cargo: CargoData) {
    this.cargoSendoEditado = cargo;
    this.form.get('nome')?.setValue(cargo.nome);
  }

}

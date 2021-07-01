import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';

@NgModule({
  declarations: [
    UsuarioComponent,
    CpfPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [
    UsuarioComponent
  ],
  providers: [
    UsuarioService
  ],
})
export class UsuarioModule { }

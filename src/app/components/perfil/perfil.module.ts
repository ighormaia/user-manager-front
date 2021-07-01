import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PerfilComponent } from './perfil.component';
import { PerfilService } from './perfil.service';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    PerfilComponent
  ],
  providers: [
    PerfilService
  ],
})
export class PerfilModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorComponent } from './components/jugador/jugador.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    JugadorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[provideHttpClient()]
})
export class JugadorModule { }

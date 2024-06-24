import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorComponent } from './components/jugador/jugador.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NewjugadorComponent } from './components/newjugador/newjugador.component';



@NgModule({
  declarations: [
    JugadorComponent,
    NewjugadorComponent
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

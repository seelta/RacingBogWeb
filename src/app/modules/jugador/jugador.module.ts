import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorComponent } from './components/jugador/jugador.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NewjugadorComponent } from './components/newjugador/newjugador.component';
import { EditjugadorComponent } from './components/editjugador/editjugador.component';
import { NgbModule, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { PersonaComponent } from '../persona/components/persona/persona.component';
import { MensualidadJugadorComponent } from './components/mensualidadJugador/mensualidad-jugador.component';
import { DataTablesModule } from 'angular-datatables';
import { ToastComponent } from '../shared/components/toast/toast.component';



@NgModule({
  declarations: [
    JugadorComponent,
    NewjugadorComponent,
    EditjugadorComponent,
    MensualidadJugadorComponent
    
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,    
    FormsModule,
    ReactiveFormsModule,
    PersonaComponent,
    DataTablesModule,
    ToastComponent
    
  ],
  providers:[provideHttpClient()]
})
export class JugadorModule { }

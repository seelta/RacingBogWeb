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



@NgModule({
  declarations: [
    JugadorComponent,
    NewjugadorComponent,
    EditjugadorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,    
    FormsModule,
    ReactiveFormsModule,
    PersonaComponent
    
  ],
  providers:[provideHttpClient()]
})
export class JugadorModule { }

import { Component, inject, Input, input, OnInit } from '@angular/core';
import { JugadorService } from '../../../shared/services/jugador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../../../../Models/jugador';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-editjugador',
  templateUrl: './editjugador.component.html',
  styleUrl: './editjugador.component.css',
  standalone: false

})
export class EditjugadorComponent implements OnInit {

  @Input() jugador: Jugador | null = null;
  _jugadorService = inject(JugadorService);
  _toastService = inject(ToastService);
  active = 1;
  idpersona: number = this._jugadorService.getIdPersona();
  jugadorForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {

    this.jugadorForm = this.fb.group({
      //idJugador: [null],
      idPersona: this.fb.group({
        idPersona: [null]
      }),
      idPrograma: this.fb.group({
        idPrograma: [null]
      }),
      posicion: ['', Validators.required],
      // portero: [false, Validators.required],
      estatura: [null, Validators.required],
      peso: [null, Validators.required],
      uniTalla: ['', Validators.required],
      uniNombreEstampado: ['', Validators.required],
      uniNumeroEstampado: [null, Validators.required],
      uniEntreTalla: ['', Validators.required],
      uniEntreNumero: [null, Validators.required],
      autorizacionLlegaSalida: [false, Validators.required],
      idEstado: this.fb.group({
        idEstadoJugador: [null, Validators.required]
      }),
      fechaIngreso: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      //fechaModificacion: [null]
    });

  }


  ngOnInit(): void {

    console.log(" ngOnInit componente jugador en edit jugador ", this.jugador)
    if (this.jugador?.idJugador) {
      // this._jugadorService.getJugadorById(this.jugador.idJugador).subscribe({
      //   next: resp => {
      //     this.jugadorForm.patchValue(resp);
           this.jugadorForm.patchValue(this.jugador);
      //   },
      //   error: erro => {
      //     this._toastService.show('Error al actualizar la persona', { classname: 'bg-error text-light', delay: 3000 });
      //   }
      // });
    }
  }

  onSubmit(): void {
    // if (this.jugadorForm.valid) {
    //   if (this.jugadorId) {
    //     this.jugadorService.updateJugador(this.jugadorId, this.jugadorForm.value).subscribe(() => {
    //       this.router.navigate(['/jugadores']);
    //     });
    //   } else {
    //     this.jugadorService.createJugador(this.jugadorForm.value).subscribe(() => {
    //       this.router.navigate(['/jugadores']);
    //     });
    //   }
    // }
  }


}

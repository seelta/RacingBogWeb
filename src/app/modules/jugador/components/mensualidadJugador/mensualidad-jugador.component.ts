import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { JugadorService } from '../../../shared/services/jugador.service';
import { DTOMensualidadJugador } from '../../../../Models/dtomensualidad-jugador';
import { data } from 'jquery';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-mensualidad',
  templateUrl: './mensualidad-jugador.component.html',
  styleUrl: './mensualidad-jugador.component.css'
})
export class MensualidadJugadorComponent implements OnInit  {


  dtOptions: Config = {};
  @Input() jugadorid?: number;

  _jugadorService = inject(JugadorService);
  _toastService = inject(ToastService);
  mensualidadJ: DTOMensualidadJugador[] = [];

  dtTrigger: Subject<any> = new Subject();

  recargo: string = "dangrer";
  diaDelMes = new Date().getDate();



  ngOnInit(): void {
    

    this._jugadorService.getMensualidadByIdJugador(this.jugadorid).subscribe({
      next: data => {
        this.procesMensualidadJResponse(data.response.items)
      },
      error: err => {
        this._toastService.show('Error al consultar la mensualidad', { classname: 'bg-error text-light', delay: 3000 });
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    

  }


  procesMensualidadJResponse(data:DTOMensualidadJugador[]){
    this.mensualidadJ =  data;
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}

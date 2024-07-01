import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { JugadorService } from '../../../shared/services/jugador.service';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { NewjugadorComponent } from '../newjugador/newjugador.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        height: '0px'
      })),
      transition('void <=> *', [
        animate(300)
      ])
    ])
  ],
 
})
export class JugadorComponent implements OnInit {
  
  private jugadorService = inject(JugadorService);

  readonly dialog = inject(MatDialog);

  private snackBar=inject(MatSnackBar)

  isEditJugador: boolean = false;

  ngOnInit(): void {
    this.getJugadores();
  }


dispayedColums: string[] =['id','nombres','apellidos', 'categoria', 'posicion', 'fechaNacimeinto', 'fechaIngreso', 'actions'];

dataSource = new MatTableDataSource<JugadorElement>();

@ViewChild(MatPaginator)
paginator!: MatPaginator;

  getJugadores(): void{

    this.jugadorService.getJugadores()
      .subscribe(
        
        {
          next:  resp => {
            console.log("respuesta jugadores", resp);
            this.processJugadorResponse(resp);
          },
          error: err =>{
            console.log("error:" , err);    
          }
        }        
        )}

  processJugadorResponse(resp:any){
    const dataJugador: JugadorElement[] = [];

    if(resp.metadata[0].code=="00"){
      
      let listJugador= resp.response.items
      

      listJugador.forEach((element : JugadorElement) => {
        dataJugador.push(element)
      });

      this.dataSource=new MatTableDataSource<JugadorElement>(dataJugador);

      console.log("datasource:" , this.dataSource)
      this.dataSource.paginator = this.paginator

    }

  }
  
  openJugadorDialog(){

    const dialogRef = this.dialog.open( NewjugadorComponent, {
      width: '50%'
      // data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');

      if(result == 1){
        this.openSnackBar("Jugador agregado", "Exitosa");
        this.getJugadores();
        console.log("envia ok openSnackBar");

      }else if (result == 2){
        this.openSnackBar("Error al guardar el jugador", "Error");
        console.log("envia error openSnackBar");

      }
     
    });
    
  }

  edit(jugador:JugadorElement){

    this.jugadorService.getJugadorById(jugador.idJugador)
    .subscribe({
      next: res =>{
        this.processJugadorResponse(res);
      },
      error: err =>{
        return this.getJugadores();
      }
    })

    this.isEditJugador = !this.isEditJugador;
    // const dialogRef = this.dialog.open( NewjugadorComponent, {
      
    //   data: { jugador },
    //   width: '50%'
    // });

    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');

    //   if(result == 1){
    //     this.openSnackBar("Jugador agregado", "Exitosa");
    //     this.getJugadores();
    //     console.log("envia ok openSnackBar");

    //   }else if (result == 2){
    //     this.openSnackBar("Error al guardar el jugador", "Error");
    //     console.log("envia error openSnackBar");

    //   }
     
    // });

  }


  delete(id:any){

    const dialogRef = this.dialog.open( ConfirmComponent, {
      
      data: { id:id },
      height: '30%'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');

      if(result == 1){
        this.openSnackBar("Jugador eliminado", "Exitosa");
        this.getJugadores();
        console.log("envia ok openSnackBar");

      }else if (result == 2){
        this.openSnackBar("Error al eliminar el jugador", "Error");
        console.log("envia error openSnackBar");

      }
     
    });   

  }

  buscar(s : String){
    console.log(s);
    if (s.length === 0 ) {
        return this.getJugadores();
    } 
    
    this.jugadorService.getJugadorById(s)
    .subscribe({
      next: res =>{
        this.processJugadorResponse(res);
      },
      error: err =>{
        return this.getJugadores();
      }
    })

  }

  openSnackBar(mensaje: string, action:string) : MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(mensaje, action, {
      duration: 2000
    });
  }

}



export interface IdTipoDocumento {
  idTipoDocumento: number;
  tipoDocumento: string;
}

export interface IdDepMuniExpedicion {
  idDepartamentoMunicipio: number;
  idDepartamento: number;
  municipio: string;
}

export interface IdTipoPersona {
  idTipoPersona: number;
  tipoPersona: string;
}

export interface IdPersona {
  idPersona: number;
  nombres: string;
  apellidos: string;
  idTipoDocumento: IdTipoDocumento;
  idDepMuniExpedicion: IdDepMuniExpedicion;
  fechaNacimiento: string;
  sexo: number;
  correo: string;
  celular: number;
  direccionRecidencia: string;
  barrio: string;
  estrato: number;
  idTipoPersona: IdTipoPersona;
}

export interface IdProfesor {
  idProfesor: number;
  idPersona: IdPersona;
  contrato: string;
  especialidad: string;
  salario: number;
  fechaContratacion: string;
  fechaBaja: string | null;
}

export interface IdPrograma {
  idPrograma: number;
  nombrePrograma: string;
  descripcion: string;
  idProfesor: IdProfesor;
  baner: string;
  costoAfiliacion: number;
  incluyeAfiliacion: string;
  costoMensualidad: number;
  recargo: number;
  incluyeMensualidad: string;
  horario: string;
}

export interface IdEstado {
  idEstadoJugador: number;
  estadoJugador: string;
}

export interface JugadorElement {
  idJugador: number;
  idPersona: IdPersona;
  idPrograma: IdPrograma;
  posicion: string;
  portero: boolean;
  estatura: number;
  peso: number;
  uniTalla: string;
  uniNombreEstampado: string;
  uniNumeroEstampado: number;
  uniEntreTalla: string;
  uniEntreNumero: number;
  autorizacionLlegaSalida: boolean;
  idEstado: IdEstado;
  fecha_creacion: string;
  fecha_modificacion: string | null;
}

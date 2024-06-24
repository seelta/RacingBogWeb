import { Component, OnInit, inject } from '@angular/core';
import { JugadorService } from '../../../shared/services/jugador.service';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { NewjugadorComponent } from '../newjugador/newjugador.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent implements OnInit {
  
  private jugadorService = inject(JugadorService);

  readonly dialog = inject(MatDialog);

  private snackBar=inject(MatSnackBar)


  ngOnInit(): void {
    this.getJugadores();
  }


dispayedColums: string[] =['id','nombres','apellidos', 'categoria', 'posicion', 'fechaNacimeinto', 'fechaIngreso', 'actions'];

dataSource = new MatTableDataSource<JugadorElement>();

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
      
      let listJugador= resp.jugadorResponse.jugador
      

      listJugador.forEach((element : JugadorElement) => {
        dataJugador.push(element)
      });

      this.dataSource=new MatTableDataSource<JugadorElement>(dataJugador);

      console.log("valida lo que va", this.dataSource.data)
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

    const dialogRef = this.dialog.open( NewjugadorComponent, {
      
      data: { jugador },
      width: '50%'
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

  openSnackBar(mensaje: string, action:string) : MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(mensaje, action, {
      duration: 2000
    });
  }

}



export interface JugadorElement{
    id: number,
    nombres: string,
    apellidos: string,
    fechaNacimeinto: string,
    categoria: string,
    posicion: string ,
    fechaIngreso: string

}
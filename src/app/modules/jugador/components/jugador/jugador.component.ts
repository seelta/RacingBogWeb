import { Component, OnInit, inject } from '@angular/core';
import { JugadorService } from '../../../shared/services/jugador.service';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent implements OnInit {
  
  private jugadorService = inject(JugadorService);


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
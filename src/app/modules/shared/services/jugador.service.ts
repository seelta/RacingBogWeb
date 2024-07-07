import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from '../../../Models/jugador';


const base_url ="http://localhost:8081/api/v1"

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  dataJugador: Jugador[] = [];

  idPersona: number = 0;
  

  constructor( private http: HttpClient) { }

  getIdPersona():number{
    return this.idPersona
  }

  setIdPersona(idpersona: number){
    this.idPersona = idpersona;
  }

  getJugadores(){
    const endpoint = `${base_url}/Jugador`;
    let data = this.http.get(endpoint);    
    //para manejar los jugadores desde el servico
    // let x :any=data;
    //  (x.Response.Items).forEach((element : Jugador) => {
    //   this.dataJugador.push(element)
    // });
    return data

  }

  saveJugador(body:any){
    const endpoint = `${base_url}/Jugador`;
    return this.http.post(endpoint,body);
  }

  updateJugador(body:any, id:any){
    const endpoint = `${base_url}/Jugador/${id}`;
    return this.http.put(endpoint,body);
  }

  deleteJugador( id:any){
    const endpoint = `${base_url}/Jugador/${id}`;
    return this.http.delete(endpoint);
  }

  getJugadorById( id:any){
    const endpoint = `${base_url}/Jugador/${id}`;
    return this.http.get(endpoint);
  }

  getPersonaById( id:any){
    const endpoint = `${base_url}/Persona/${id}`;
    return this.http.get(endpoint);
  }

  updatePersonaJugador(body:any, id:any){
    //body.idTipoPersona.idTipoPersona = 1
    const endpoint = `${base_url}/Persona/${id}`;
    return this.http.put(endpoint,body);
  }


}

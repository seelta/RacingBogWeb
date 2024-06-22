import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base_url ="http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor( private http: HttpClient) { }


  getJugadores(){

    const endpoint = `${base_url}/Jugadores`;

    return this.http.get(endpoint);

  }

}
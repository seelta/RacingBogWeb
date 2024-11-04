import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url ="http://localhost:8081/api/v1"

@Injectable({
  providedIn: 'root'
})
export class MensualidadService {

  constructor(private http: HttpClient) { }


  uploadFile(formData:FormData) : Observable<any>{
    return this.http.post(  `${base_url}/media/upload`, formData);
  }

  savePago(body:any): Observable<any>{
    const endpoint = `${base_url}/Pago`;
    return this.http.post(endpoint,body);
  }



}

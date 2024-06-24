import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JugadorService } from '../../../shared/services/jugador.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JugadorComponent, JugadorElement } from '../jugador/jugador.component';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newjugador',
  templateUrl: './newjugador.component.html',
  styleUrl: './newjugador.component.css'
})
export class NewjugadorComponent implements OnInit {
  

  public jugadorForm!: FormGroup;  
  private fb = inject(FormBuilder);
  private jugadorService = inject(JugadorService);
   private dialogRef = inject(MatDialogRef);

   @Input()  jugadorC!: JugadorElement ;
    public  diaglogData = inject(MAT_DIALOG_DATA);

    estadoFormulario: string = "Agregar nuevo jugador"
   
  //  private datePipe = inject(DatePipe)

  // constructor(@Inject(MAT_DIALOG_DATA) public dialogData) {
  //   this.jugadorC = dialogData; // Asignar los datos inyectados a una propiedad del componente

  //   const jugadorss: JugadorElement = JSON.parse(dialogData);
  // }


ngOnInit(): void {
  
  this.jugadorForm= this.fb.group({
  
   nombres:['', Validators.required],
   apellidos:['', Validators.required],
   categoria:['', Validators.required],
   fechaNacimeinto:['', Validators.required],
   posicion:['', Validators.required]
  
  })

if (this.diaglogData != null){
  this.jugadorC = this.diaglogData["jugador"];
  this.updateForm(this.jugadorC);
  this.estadoFormulario = "Actualizar jugador / " + this.jugadorC.nombres + " " + this.jugadorC.apellidos;
}




  }

  onSave(){

    var fn = new Date( this.jugadorForm.get('fechaNacimeinto')?.value);
    var fi = new Date();

    let data={
      // id: 1,
        nombres: this.jugadorForm.get('nombres')?.value,
        apellidos: this.jugadorForm.get('apellidos')?.value,
        fechaNacimeinto:  `${fn.getFullYear()}-${fn.getMonth() < 10 ? '0' : '' }${fn.getMonth()+1}-${fn.getDate()}` ,
        categoria: this.jugadorForm.get('categoria')?.value,
        posicion: this.jugadorForm.get('posicion')?.value ,
         fechaIngreso: `${fi.getFullYear()}-${fi.getMonth() < 10 ? '0' : '' }${fi.getMonth()+1}-${fi.getDate()}` 
    }


    if ( this.diaglogData != null ) {
      
      this.jugadorService.updateJugador(data , this.jugadorC.id )
        .subscribe({
          next:  resp => {
            this.dialogRef.close(1);
          },
          error: err =>{  
            this.dialogRef.close(2);
          }
        })

    } else {
      
      this.jugadorService.saveJugador(data)
        .subscribe({
          next:  resp => {
            this.dialogRef.close(1);
          },
          error: err =>{  
            this.dialogRef.close(2);
          }
        })
    }

  }  


  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
// console.log("Entra al update jugador", data)
// Object.keys(data).forEach (key =>{
//   console.log(`${key}: ${data[key]}`);
// })

    this.jugadorForm= this.fb.group({    

      nombres:[data.nombres, Validators.required],
      apellidos:[data.apellidos, Validators.required],
      categoria:[data.categoria, Validators.required],
      fechaNacimeinto:[data.fechaNacimeinto, Validators.required],
      posicion:[data.posicion, Validators.required]
  
     })
  }

}

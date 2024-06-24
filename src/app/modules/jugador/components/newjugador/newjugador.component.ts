import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JugadorService } from '../../../shared/services/jugador.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JugadorComponent } from '../jugador/jugador.component';
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
  //  private datePipe = inject(DatePipe)

  // constructor(
  //   public dialogRef: MatDialogRef<JugadorComponent>) { }

ngOnInit(): void {
   this.jugadorForm= this.fb.group({

    nombres:['', Validators.required],
    apellidos:['', Validators.required],
    categoria:['', Validators.required],
    fechaNacimeinto:['', Validators.required],
    posicion:['', Validators.required]

   })
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
    this.jugadorService.saveJugador(data)
      .subscribe({
        next:  resp => {
          console.log("respuesta jugadores", resp);
          this.dialogRef.close(1);
        },
        error: err =>{
          console.log("data:" , data);    
          console.log("error:" , err);    
          this.dialogRef.close(2);
        }

      })


  }  


  onCancel(){
    this.dialogRef.close(3);
  }


}

import { Component, inject } from '@angular/core';
import { JugadorService } from '../../services/jugador.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

private jugadorService = inject(JugadorService);
private dialogRef = inject(MatDialogRef);
public data = inject(MAT_DIALOG_DATA);


onNoClick(){
  this.dialogRef.close(3);
}

delete(){

  if (this.data != null) {
    this.jugadorService.deleteJugador(this.data.id)
    .subscribe( {
      next: res =>{
        this.dialogRef.close(1);
      },
      error: er=>{
        this.dialogRef.close(2);
      }
    })
  } else{
    this.dialogRef.close(2);
  }

}

}

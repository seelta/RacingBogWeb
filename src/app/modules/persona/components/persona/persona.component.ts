import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JugadorService } from '../../../shared/services/jugador.service';
import { Persona } from '../../../../Models/persona';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../../../shared/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';


@Component({
  selector: 'app-persona',
  standalone: true,
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastComponent]
})
export class PersonaComponent implements OnInit {


  private personaService = inject(JugadorService)

  personaForm: FormGroup;
  private fb = inject(FormBuilder);
  @Input() personaId!: number;
  @Input() context!: String;
  @Output() carrarPadre = new EventEmitter<void>();
  private snackBar = inject(MatSnackBar);
  toastService = inject(ToastService);
  /**
   *
   */
  constructor() {

    console.log("llegada id persona Com Persona", this.personaId);
    this.personaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      idTipoDocumento: this.fb.group({
        idTipoDocumento: ['', Validators.required]
      }),
      idDepMuniExpedicion: this.fb.group({
        idDepartamentoMunicipio: ['', Validators.required]
      }),
      numDocumento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      direccionRecidencia: ['', Validators.required],
      barrio: ['', Validators.required],
      estrato: ['', Validators.required],
      idTipoPersona: this.fb.group({
        idTipoPersona: ['', Validators.required]
      })

    })
  }

  ngOnInit(): void {
    if (this.personaId) {
      this.personaService.getPersonaById(this.personaId).subscribe(data => {

        this.renderizar(data);
        this.toastService.remove(this.toastService.toasts);
      });
    }
  }

  renderizar(data: any) {
    console.log("renderixando", data.personaResponse.persona)
    let persona: Persona;
    persona = new Persona(data.personaResponse.persona[0]);

    console.log("objeto persona del renderixando", persona)

    this.personaForm.patchValue(persona);
  }


  onSubmit(): void {
    if (this.personaForm.valid) {
      if (this.personaId) {

        console.log("submit formulario", this.personaForm.value)


        this.personaService.updatePersonaJugador(this.personaForm.value, this.personaId).subscribe({
          next: resp => {
            // this.openSnackBar("1", "1", "snackbar-success" );
            //this.openSnackBar("2", "2", "snackbar-warning" );
            // this.openSnackBar("3", "Exitoso", "snackbar-error" );
            this.toastService.show('Se han actualizado los datos exitosamente', { classname: 'bg-success text-light', delay: 3000 });



            console.log("guardado ok");
          },
          error: err => {
            this.toastService.show('Error al actualizar la persona', { classname: 'bg-error text-light', delay: 3000 });
          }
        });
      } else {
        // this.personaService.createPersona(this.personaForm.value).subscribe(() => {
        //   this.router.navigate(['/personas']);
        // });
      }
    }
  }

  onCancel() {
    this.carrarPadre.emit();
    console.log("emitir cancelar desde el hijo")
  }

  openSnackBar(mensaje: string, action: string, type: string): MatSnackBarRef<SimpleSnackBar> {

    return this.snackBar.open(mensaje, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [type]
      //duration: 2000
    });
  }


}


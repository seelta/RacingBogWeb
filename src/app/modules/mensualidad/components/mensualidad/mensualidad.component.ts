import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { MensualidadService } from '../../../shared/services/mensualidad.service';
import { ImageUtils } from '../../../shared/utils/ImageUtils';
import { EvidenciaPago } from '../../../../Models/evidencia-pago';

@Component({
  selector: 'app-mensualidad',
  templateUrl: './mensualidad.component.html',
  styleUrl: './mensualidad.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastComponent, MaterialModule, DataTablesModule],
  standalone: true
})
export class MensualidadComponent {

  private mensualidadService = inject(MensualidadService);
  url?: string;
  imagePreview: string | ArrayBuffer | null = null;
  fechaActual?: Date;

  pago?: EvidenciaPago;

  constructor() {
    this.fechaActual = new Date();  // Genera la fecha actual
  }

  upload(event: any) {
    const file = event.target.files[0];
    const MAX_SIZE_MB = 3;

    if (file) {

      if (file) {
        // Llamar al método de compresión y conversión pasando el tamaño máximo
        ImageUtils.compressAndConvertToWebP(file, MAX_SIZE_MB)
          .then((compressedBlob) => {
            console.log('Imagen comprimida exitosamente, tamaño final:', compressedBlob.size / (1024 * 1024), 'MB');
            // Aquí puedes llamar a tu método para subir la imagen

            // Obtener el nombre original sin la extensión
            const originalFileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            // Crear un nuevo nombre para el archivo WebP
            const newFileName = `${originalFileNameWithoutExt}.webp`;

            const reader = new FileReader();
            reader.onload = (e) => {
              this.imagePreview = e.target?.result ?? null;
            };
            reader.readAsDataURL(compressedBlob);
            //this.uploadImage(compressedBlob, newFileName);
          })
          .catch(error => {
            console.error('Error al comprimir la imagen:', error);
          });
      }
    }
  }

  uploadImage(image: Blob, fileName: string) {
    const formData = new FormData();
    formData.append('file', image, fileName);

    this.mensualidadService.uploadFile(formData)
      .subscribe((response: any) => {
        console.log("REsponse ", response);
        this.url = response.url;
        this.url = this.url?.replace("/media", "/api/v1/media");
        console.log("REsponse ", this.url);
      })
    // Realizar la solicitud HTTP para subir la imagen
    // this.http.post('/api/upload', formData).subscribe();
  }


  savePago(event: any) {

    console.log("prueba de evento", this.pago);

    this.pago = new EvidenciaPago({
      cantidad: 180000,
      urlEvidencia: "prueba save front",
      fechaCargueEvidencia: "2024-10-26",
      detalleEvidencia: "prueba save front",
      fechaPago: "2024-10-26",
      validaPago: null,
      usuarioValidaPago: 1,
      fechaValidaPago: null,
      idMensualidad: 3
    });

    console.log("prueba de evento", this.pago);

    
    this.mensualidadService.savePago(this.pago).subscribe({
      next: (repn:any) => {
        console.log("respuesta cargue de pagos", repn );
      }
    });
  }




}

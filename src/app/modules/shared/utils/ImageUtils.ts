export class ImageUtils {

    /**
     * Comprime la imagen y la convierte a formato WebP
     * @param file El archivo de imagen a comprimir
     * @param maxSizeMB Tamaño máximo permitido en MB
     * @returns Promise<Blob> La imagen comprimida y convertida a WebP
     */
    static compressAndConvertToWebP(file: File, maxSizeMB: number): Promise<Blob> {
      const MAX_FILE_SIZE_BYTES = maxSizeMB * 1024 * 1024; // Convertir de MB a bytes
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;
          
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Redimensionar la imagen si es necesario
            let width = img.width;
            let height = img.height;
    
            const MAX_WIDTH = 1024; // Ajustar si es necesario
            const MAX_HEIGHT = 768;
    
            // Mantener proporciones
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
    
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
    
            // Reducir calidad progresivamente hasta alcanzar el tamaño deseado
            let calidad = 0.9; // Calidad inicial
            const comprimirImagen = () => {
              canvas.toBlob((blob) => {
                if (blob && blob.size > MAX_FILE_SIZE_BYTES) {
                  // Si el archivo sigue siendo grande, reducir la calidad
                  calidad -= 0.1;
                  if (calidad > 0) {
                    comprimirImagen(); // Intenta comprimir de nuevo
                  } else {
                    reject('No se pudo reducir el tamaño a menos de ' + maxSizeMB + ' MB');
                  }
                } else {
                  resolve(blob!); // Imagen comprimida exitosa
                }
              }, 'image/webp', calidad);
            };
    
            comprimirImagen();
          };
        };
  
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Lee la imagen
      });
    }
  }
  
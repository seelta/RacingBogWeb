import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });

        console.log("lo que hay en el toast", this.toasts)
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
        this.toasts = [] ;
    }
}
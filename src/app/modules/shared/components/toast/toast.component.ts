import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-toast',
  standalone:true,
  imports:[BrowserModule, NgbModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
    console.log("Estoy en el template de toast");
  }
}


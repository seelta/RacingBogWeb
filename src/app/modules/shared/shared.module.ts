import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent
  ],
  exports: [
    SidenavComponent,
    MatSidenavModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    MaterialModule,
    MatSidenavModule
    
  ],
  providers: [provideHttpClient()]
})
export class SharedModule { }

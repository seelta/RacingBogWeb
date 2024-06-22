import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';



@NgModule({
  declarations: [
    SidenavComponent
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

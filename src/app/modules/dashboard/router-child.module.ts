import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



const childroutes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'path', component: HomeComponent }

]

@NgModule({
    imports: [RouterModule.forChild(childroutes)],
    exports: [RouterModule]
    
})
export class RouterChildModule { }

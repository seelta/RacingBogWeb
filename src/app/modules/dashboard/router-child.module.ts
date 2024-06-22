import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JugadorComponent } from '../jugador/components/jugador/jugador.component';



const childroutes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'path', component: HomeComponent },
{ path: 'jugador', component: JugadorComponent }

]

@NgModule({
    imports: [RouterModule.forChild(childroutes)],
    exports: [RouterModule]
    
})
export class RouterChildModule { }

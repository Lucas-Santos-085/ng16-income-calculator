import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SimuladorComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

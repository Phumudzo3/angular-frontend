import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch} from '@angular/common/http';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent,
    CancelComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
   
  ],
  providers: [
    provideHttpClient(withFetch()) ,
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfigService, DataService } from './shared/services';
import { RestApiModule } from './shared/services/restapi/restapi.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent, PageLayoutComponent } from './shared/components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    RestApiModule,
    HeaderComponent,
    PageLayoutComponent,
  ],
  providers: [ConfigService, DataService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

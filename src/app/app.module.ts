import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { authServiceInitProvider, ConfigService, DataService } from './shared/services';
import { RestApiModule } from './shared/services/restapi/restapi.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent, PageLayoutComponent } from './shared/components';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/auth/store/auth.effects';
import { authInterceptorProviders } from './core/auth/interceptors';
import { DocumentEffects } from './store/document.effects';
import { DocListComponent } from './pages/doc-manage/doc-list/doc-list.component';
import { DocumentFacade } from './store/document.facade';
import { DocEditComponent } from './pages/doc-manage/doc-edit/doc-edit.component';

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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, DocumentEffects]),
    DocListComponent,
    DocEditComponent,
  ],
  providers: [ConfigService, DataService, DatePipe, 
    authInterceptorProviders,
    authServiceInitProvider,
    DocumentFacade,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

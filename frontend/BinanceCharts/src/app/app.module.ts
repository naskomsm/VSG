import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HydrationEffects } from './store/effects/hydration.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthenticationEffects } from './store/effects';
import { appReducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([HydrationEffects, AuthenticationEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

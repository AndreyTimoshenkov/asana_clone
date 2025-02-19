import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { Settings } from 'luxon';
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { provideStore } from '@ngrx/store';
import { taskReducer } from "./state/task/task.reducer";

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'dd-MM-yyyy'
  },
  display: {
    dateInput: 'DD',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'DDDD',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

Settings.defaultZone = 'Europe/Moscow';
Settings.defaultLocale = 'ru';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideLuxonDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    provideStore({ tasks: taskReducer }),
]
};





import 'zone.js'
import 'reflect-metadata'

import "bootstrap/css/bootstrap.css!"
import '@angular/material/core/theming/prebuilt/deeppurple-amber.css!';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from './app.module'

platformBrowserDynamic().bootstrapModule(AppModule);
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HttpModule} from "@angular/http"
import {RouterModule}   from '@angular/router'
import {MaterialModule} from '@angular/material'
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'

import {AppComponent} from './app.component'

import {AdminComponent} from "./components/admin-component";
import {ShoppingComponent} from "./components/shopping-component";
import {FilmsComponent} from "./components/films-component";
import {UsersView} from "./views/admin/users-view";
import {UserView} from "./views/admin/user-view";
import {FilmSelectionView} from "./views/film/film-selection-view";
import {FilmView} from "./views/film/film-view";
import {PartsView} from "./views/catalog/parts-view";
import {CartView} from "./views/catalog/cart-view";
import {AddPartsView} from "./views/catalog/add-part-view";
import {SimpleList} from 'angular2-simple-list';

import {AppStore,createAppStoreFactoryWithOptions} from "angular2-redux";
import reducers from "./reducers/app-reducer"
import {PartActions} from "./actions/part-actions";
import {CartActions} from "./actions/cart-actions";
import {UserActions} from "./actions/user-actions";
import {FilmActions} from "./actions/film-actions";

const appStoreFactory = createAppStoreFactoryWithOptions({
                          reducers,
                          debug:true
                        });
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule
  ],
  declarations: [AppComponent,ShoppingComponent, AdminComponent, FilmsComponent, UsersView, UserView, FilmSelectionView, FilmView, PartsView, CartView, AddPartsView, SimpleList],
  providers: [PartActions, CartActions, UserActions, FilmActions, { provide: AppStore, useFactory: appStoreFactory }],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}




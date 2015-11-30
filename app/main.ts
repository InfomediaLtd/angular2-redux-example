import 'zone.js';
import 'reflect-metadata';

import { createStore, combineReducers } from "redux";
import {bind, provide, Injector} from 'angular2/core';

import {bootstrap} from 'angular2/angular2';
import {AppComponent} from "./app-component";

import {AppStore} from "./app-store";

var id = 0;
let partReducer = (state:any = {}, action:any = {}) => {
    switch(action.type) {
        case "ADD_PART":
            return {id: action.id, name: action.name};
        default:
            return state;
    }
};
let partsReducer = (state = [], action:any = {}) => {
    switch(action.type) {
        case "ADD_PART":
            return [
                ...state,
                partReducer(null, action)
            ];
        default:
            return state;
    }
};
let cartReducer = (state = [], action:any = {}) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return [
                ...state,
                action.id
            ];
        case "REMOVE_FROM_CART":
            return state.filter((id) => (id!==action.id));
        default:
            return state;
    }
};

const appStore = createStore(combineReducers({
    parts: partsReducer,
    cart: cartReducer
}));

bootstrap(AppComponent,
    [
        provide(AppStore, {useValue: new AppStore(appStore)})
        //AppStore
    ]);

appStore.dispatch({type:"ADD_PART", id:1, name: "Bumper"});
appStore.dispatch({type:"ADD_PART", id:2, name: "MP3 Player"});
appStore.dispatch({type:"ADD_PART", id:3, name: "Mirror"});
appStore.dispatch({type:"ADD_PART", id:4, name: "Hood"});

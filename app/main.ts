import 'zone.js';
import 'reflect-metadata';

import { provide, bootstrap} from 'angular2/core';

import {AppView} from "./components/app";

import { createStore, combineReducers } from "redux";
import {AppStore} from "./app-store";

import parts from "./reducers/parts-reducer"
import cart from "./reducers/cart-reducer"

const appStore = new AppStore(createStore(combineReducers({ parts, cart })));

bootstrap(AppView,
    [
        provide(AppStore, {useValue: appStore})
        //AppStore
    ]);

appStore.dispatch({type:"ADD_PART", id:1, name: "Bumper"});
appStore.dispatch({type:"ADD_PART", id:2, name: "MP3 Player"});
appStore.dispatch({type:"ADD_PART", id:3, name: "Mirror"});
appStore.dispatch({type:"ADD_PART", id:4, name: "Hood"});

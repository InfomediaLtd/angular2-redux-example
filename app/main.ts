import 'zone.js';
import 'reflect-metadata';

import { provide, bootstrap} from 'angular2/core';

import {AppView} from "./components/app";

import { createStore, combineReducers } from "redux";
import {AppStore} from "./app-store";

import parts from "./reducers/parts-reducer"
import cart from "./reducers/cart-reducer"
import {addPart} from "./actions/part-actions"

const appStore = new AppStore(createStore(combineReducers({ parts, cart })));

bootstrap(AppView,
    [
        provide(AppStore, {useValue: appStore})
        //AppStore
    ]);

appStore.dispatch(addPart("Bumper"));
appStore.dispatch(addPart("MP3 Player"));
appStore.dispatch(addPart("Mirror"));
appStore.dispatch(addPart("Hood"));

import 'zone.js';
import 'reflect-metadata';

import { provide, bootstrap, injector } from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppView} from "./components/app";

import { createStore, combineReducers, bindActionCreators, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'

import {AppStore} from "./stores/app-store";

import parts from "./reducers/parts-reducer"
import cart from "./reducers/cart-reducer"
import users from "./reducers/users-reducer"
import {addPart} from "./actions/part-actions"

import {fetchUsers} from "./actions/user-actions"
import {UserActions} from "./actions/user-actions";

// example middleware
const loggerMiddleware = store => next => action => {
    //console.log('dispatching', action);
    let result = next(action);
    //console.log('next state', store.getState());
    return result
};

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
const appStore = new AppStore(createStoreWithMiddleware(combineReducers({ parts, cart, users })));

bootstrap(AppView,
    [
        provide(AppStore, {useValue: appStore}),
        HTTP_PROVIDERS,
        UserActions
    ]);

const addPartAction = bindActionCreators(addPart, appStore.dispatch);
addPartAction("Bumper");
addPartAction("MP3 Player");
addPartAction("Mirror");
addPartAction("Hood");


//appStore.dispatch(fetchUsers());
/*
appStore.dispatch(fetchUsers()).then(() =>
    console.log(appStore.getState().users)
);*/

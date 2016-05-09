import "zone.js";
import "reflect-metadata";
import "bootstrap/css/bootstrap.css!"
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {AppComponent} from "./app";
import {AppStore,createAppStoreFactoryWithOptions} from "angular2-redux";
import parts from "./reducers/parts-reducer"
import cart from "./reducers/cart-reducer"
import users from "./reducers/users-reducer"
import films from "./reducers/films-reducer"
import {PartActions} from "./actions/part-actions";
import {CartActions} from "./actions/cart-actions";
import {UserActions} from "./actions/user-actions";
import {FilmActions} from "./actions/film-actions";

const appStoreFactory = createAppStoreFactoryWithOptions({
                          reducers:{ parts, cart, users, films },
                          debug:true
                        });

bootstrap(AppComponent,
    [
        provide(AppStore, { useFactory: appStoreFactory }),
        HTTP_PROVIDERS,
        CartActions, PartActions, UserActions, FilmActions
    ]);

/* tslint:disable */
// polyfill for Object.assign (not part of TS yet)
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            "use strict";
            if (target === undefined || target === null) {
                throw new TypeError("Cannot convert first argument to object");
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

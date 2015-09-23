"use strict";

import React from "react";
import { createStore as initialCreateStore, compose } from "redux";

let createStore = initialCreateStore;

console.log("CREATE", createStore);

if (__DEV__) {
    createStore = compose(
        require("redux-devtools").devTools(),
        require("redux-devtools").persistState(
            window.location.href.match(/[?&]debug_session=([^&]+)\b/)
        )
    )(initialCreateStore);
}

let renderDevTools = function(store) {
    if (__DEV__) {
        let { DevTools, DebugPanel, LogMonitor } = require("redux-devtools/lib/react");
        // debugger
        return (
            <DebugPanel top right bottom >
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        );
    }
    return null;
}

console.log("CREATED", createStore)

export default {createStore, renderDevTools};

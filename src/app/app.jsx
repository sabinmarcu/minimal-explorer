(function () {
    'use strict';

    require("babel/polyfill");
    require("!!style!css?-modules!mdi/css/materialdesignicons.css");

    let React = require('react/addons');
    let injectTapEventPlugin = require('react-tap-event-plugin');
    let Main = require('./components/main');

    let {renderDevTools, createStore} = require("./helpers/devTools");

    let { combineReducers } = require('redux');
    let { Provider } = require('react-redux');
    let { arrayToReducerMap, loadReducers } = require("./helpers/util");

    // For dev
    if (__DEV__) {
        window.React = React;
    }

    // Material-UI requirement
    injectTapEventPlugin();

    // Load Reducers
    let ctx = require.context('./reducers/', true, /\.\/?(.*)\/((?:_init|[^\/]+\.reducer)\.(?:js|jsx|ls))$/gm);
    let reducers = loadReducers(ctx);

    // Create the Redux store
    const reducer = combineReducers( reducers );
    const store = createStore(reducer);


    let meta;
    meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "height=device-height, width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1");
    document.head.appendChild(meta);

    meta = document.createElement("link");
    meta.setAttribute("rel", "apple-touch-icon");
    meta.setAttribute("href", "512.png");
    document.head.appendChild(meta);
    meta = document.createElement("link");
    meta.setAttribute("rel", "apple-touch-icon");
    meta.setAttribute("sizes", "152x152");
    meta.setAttribute("href", "152.png");
    document.head.appendChild(meta);
    meta = document.createElement("link");
    meta.setAttribute("rel", "apple-touch-icon");
    meta.setAttribute("sizes", "120x120");
    meta.setAttribute("href", "120.png");
    document.head.appendChild(meta);
    meta = document.createElement("link");
    meta.setAttribute("rel", "apple-touch-icon");
    meta.setAttribute("sizes", "76x76");
    meta.setAttribute("href", "76.png");
    document.head.appendChild(meta);

    meta = document.createElement("meta");
    meta.setAttribute("name", "apple-mobile-web-app-capable");
    meta.setAttribute("content", "yes");
    document.head.appendChild(meta);

    meta = document.createElement("link");
    meta.setAttribute("rel", "icon");
    meta.setAttribute("href", "icon.ico");
    document.head.appendChild(meta);

    document.title = __NAME__;

    // Mount the app and dev tools
    React.render(
        (<div>
            <Provider store={store}>
                {() => <Main url="comments.json" pollInterval={2000} />}
            </Provider>
            {renderDevTools(store)}
        </div>)
    , document.body);

})();

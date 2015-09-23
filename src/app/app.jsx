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

import React from "react";
import EnhancedComponent from "../baseComponent";
import { selfbind } from "../../helpers/decorators";

import lineScale from "!!style!css?-modules!load-awesome/css/line-scale.min.css"

export default class ImageLoader extends EnhancedComponent {

    state = {
        loaded: false,
        height: 0,
        width: 0,
    }

    constructor(...args) {
        super(require, ...args);
        // let e = document.querySelector("#line-scale-spinner");
        // if (!e) {
        //     e = document.createElement("link");
        //     e.setAttribute("href", "https://raw.githubusercontent.com/danielcardoso/load-awesome/master/css/line-scale.min.css");
        //     e.setAttribute("id", "line-scale-spinner");
        //     e.setAttribute("rel", "stylesheet");
        //     document.head.appendChild(e);
        // }
    }

    @selfbind
    loadHandler(event) {
        this.setState({height: event.target.height, width: event.target.width});
        setTimeout(() => {
            this.setState({loaded: true});
            this.props.loadHandler && this.props.loadHandler();
        }, 500);
    }
}

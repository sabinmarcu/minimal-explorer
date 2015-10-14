import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import marked from "marked";
import { selfbind } from "../../helpers/decorators";

export default class Item extends EnhancedComponent {

    state = {
        previewLoaded: false,
    }

    constructor(...args) {
        super(require, ...args);
    }

    @selfbind
    previewLoadHandler() { 
        this.setState({previewLoaded: true});
    }
}

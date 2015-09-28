import React from "react";
import EnhancedComponent from "../baseComponent";

export default class ItemsList extends EnhancedComponent {

    static propTypes = {
        fiels: React.PropTypes.object.isRequired,
    }

    state = {
        active: "",
    }

    activeClass(item) {
        return this.state.active === item ?
            this.styles.active :
            ((this.state.active !== "") ? this.styles.inactive : "");
    }

    constructor(...args) {
        super(require, ...args);
    }
}

import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";

@connect((state) => {
    return {
        descriptions: state.main.descriptions,
    }
})
export default class ItemsList extends EnhancedComponent {

    static propTypes = {
        descriptions: React.PropTypes.object.isRequired,
    }

    constructor(...args) {
        super(require, ...args);
    }
}

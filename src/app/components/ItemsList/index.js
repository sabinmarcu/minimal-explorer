import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import { selfbind } from "../../helpers/decorators";
import { actions } from "../../helpers/util";

@connect((state) => {
    return {
        descriptions: state.main.descriptions,
        folders: state.main.folders,
    }
})
export default class ItemsList extends EnhancedComponent {

    static propTypes = {
        descriptions: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    getPath(item) {
        return `${this.props.index === "ROOT" ? "" : `${this.props.index}/`}${item}`
    }

    @selfbind
    select(item, compose = true) {
        this.props.dispatch(
            actions.main.changeFocus(
                compose ? this.getPath(item) : (item === "" ? "ROOT": item)
            )
        );
    }

    @selfbind
    link(item) {
        let l = window.location + "";
        window.location = (l[l.length - 1] === "/" ? l : l + "/") + this.getPath(item);
    }

    constructor(...args) {
        super(require, ...args);
    }
}

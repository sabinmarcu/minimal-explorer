import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import { selfbind } from "../../helpers/decorators";
import Util from "../../helpers/util";

import check from "check-types";
import jQuery from "jquery";

@connect((state) => {
    return {
        descriptions: state.main.descriptions,
        folders: state.main.folders,
        previews: state.main.previews,
    }
})
export default class ItemsList extends EnhancedComponent {

    static propTypes = {
        descriptions: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    state = {
        finalStyles: {},
    }

    getPath(item) {
        return `${this.props.index === "ROOT" ? "" : `${this.props.index}/`}${item}`
    }

    @selfbind
    goBack(where) {
        this.props.dequeue();
    }

    @selfbind
    select(item) {
        this.props.queue(this.getPath(item));
    }

    @selfbind
    expandReadme(item) {
        this.props.queue(this.getPath(item) + "/readme.md");
    }

    @selfbind
    link(item) {
        let l = window.location + "";
        window.location = (l[l.length - 1] === "/" ? l : l + "/") + this.getPath(item);
    }

    componentDidMount() {
        setTimeout(
            () => this.setState({finalStyles: {transform: "none", opacity: 1}})
        , 500);
        // this._check();
    }

    // componentDidUpdate() {
    //     this._check();
    // }

    // _check() {
    //     console.log("Going to check", this.props.items && Object.keys(this.props.items));
    //     this.props.items && Object.keys(this.props.items).map(item => {
    //         console.log(`Checking ${this.getPath(item)} (${Util.suffixSlash(this.getPath(item))}preview.png)`, this.props.previews);
    //         return ! check.string(this.props.previews[
    //             this.getPath(item)
    //         ]) && jQuery.get(
    //             Util.suffixSlash(this.getPath(item)) + "preview.png"
    //         ).done( () => this.props.dispatch(
    //             Util.actions.main.approvePreview( this.getPath(item) )
    //         ))
    //     });
    // }

    constructor(...args) {
        super(require, ...args);
    }
}

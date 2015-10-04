import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import { selfbind } from "../../helpers/decorators";
import { actions } from "../../helpers/util";

@connect((state) => {
    return {
        descriptions: state.main.descriptions,
        previews: state.main.previews,
        folders: state.main.folders,
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
    }

    constructor(...args) {
        super(require, ...args);
    }
}

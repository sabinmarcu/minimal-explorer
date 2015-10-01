import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import Util from "../../helpers/util";
import _ from "lodash";
import marked from "marked";
import jQuery from "jquery";

@connect((state) => {
    return {
        files: state.main.filesMap,
        folders: state.main.folders,
        descriptions: state.main.descriptions,
        focus: state.main.focus,
        readmes: state.main.readmes,
    }
})
export default class Main extends EnhancedComponent {

    static propTypes = {
        files: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    state = {
        queue: ["ROOT"],
    }

    componentDidMount() {
        jQuery.getJSON(
            Util.suffixSlash(window.location) + "config.json",
            data => this.props.dispatch(Util.actions.main.addFiles(data))
        );
    }

    distanceTo(it, target, array) {
        return array.indexOf(target) >= 0 && array.indexOf(it) >= 0 ? array.indexOf(target) - array.indexOf(it) : null;
    }

    constructor(...args) {
        super(require, ...args);
    }
}

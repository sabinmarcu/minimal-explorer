import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import Util from "../../helpers/util";
import { selfbind } from "../../helpers/decorators";
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
        queue: state.main.queue,
        previews: state.main.previews,
    }
})
export default class Main extends EnhancedComponent {

    static propTypes = {
        files: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    state = {
        width: window.innerWidth,
    }

    componentDidMount() {
        jQuery.getJSON(
            Util.suffixSlash(window.location) + "config.json",
            data => this.props.dispatch(Util.actions.main.addFiles(data))
        );
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}) );
    }

    distanceTo(it, target, array) {
        return array.indexOf(target) >= 0 && array.indexOf(it) >= 0 ? array.indexOf(target) - array.indexOf(it) : null;
    }

    @selfbind
    queue(item) {
        this.props.dispatch(
            Util.actions.main.queueView(item, () =>
                this.props.dispatch(
                    Util.actions.main.changeFocus(item)
                )
            )
        );
    }

    @selfbind
    dequeue() {
        this.props.dispatch(
            Util.actions.main.dequeueView()
        )
    }

    constructor(...args) {
        super(require, ...args);
    }
}

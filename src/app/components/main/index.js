import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import Util from "../../helpers/util";
import _ from "underscore";

@connect((state) => {
    return {
        files: state.main.rawfiles,
        description: state.main.description,
    }
})
export default class Main extends EnhancedComponent {

    static propTypes = {
        files: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    componentDidMount() {
        Util.getFiles((files) =>
            this.props.dispatch(Util.actions.main.addFiles(files))
        )
        Util.getDescription((file) =>
            this.props.dispatch(Util.actions.main.addDescription(file))
        )
    }

    constructor(...args) {
        super(require, ...args);
    }
}

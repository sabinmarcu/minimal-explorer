import React from "react";
import EnhancedComponent from "../baseComponent";
import $ from "jQuery";
import { selfbind } from "../../helpers/decorators";

export default class TreeView extends EnhancedComponent {

    static propTypes = {
        branch: React.PropTypes.array.isRequired,
    }

    state = {
        open: false,
    }

    @selfbind
    toggle() {
        if (!this.props.disabled) {
            this.setState({open: !this.state.open});
        }
    }

    constructor(...args) {
        super(require, ...args);
    }

    componentDidMount() {
        if (this.props.open) {
            this.setState({open: this.props.open});
        }
    }
}

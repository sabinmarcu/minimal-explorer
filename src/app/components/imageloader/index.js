import React from "react";
import EnhancedComponent from "../baseComponent";
import { selfbind } from "../../helpers/decorators";

import lineScale from "!!style!css?-modules!load-awesome/css/line-scale.min.css"

export default class ImageLoader extends EnhancedComponent {

    state = {
        loaded: false,
        height: 0,
        width: 0,
        containerHeight: 0,
        containerWidth: 0,
    }

    constructor(...args) {
        super(require, ...args);
    }

    // componentDidMount() {
    //     window.addEventListener("resize", this.resizeHandler);
    //     this.resizeHandler();
    // }

    @selfbind
    loadHandler(event) {
        // this.setState({height: event.target.height, width: event.target.width});
        setTimeout(() => {
            this.setState({loaded: true});
            this.props.loadHandler && this.props.loadHandler();
        }, 500);
    }

    // resizeHandler() {
    //     let node = React.findDOMNode(this.refs.placeholder);
    //     node.style.width = "100%";
    //     node.style.height = "100%";
    //     this.setState({
    //         containerHeight: node.offsetHeight, 
    //         containerWidth: node.offsetWidth,
    //     });
    // }
}

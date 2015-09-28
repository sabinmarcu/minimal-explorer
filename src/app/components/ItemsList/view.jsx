import React from "react";
import check from "check-types";
import Util from "../../helpers/util";
import Item from "../item";
import Velocity from "velocity-animate";
import VelocityTransitionGroup from "velocity-transition-group";

const delay = 150;

export default {
    render() {
        let children = this.props.items && Object.keys(this.props.items).length > 0 && Object.keys(this.props.items).map((item, index) =>
            <Item file={item} content={this.props.items[item]} style={{transitionDelay: index * delay + "ms"}}/>
        );
        if (children && this.props.index && this.props.descriptions[this.props.index]) {
            children.unshift(<Item file="Readme" readme={this.props.descriptions[this.props.index]} style={{transitionDelay: "0ms"}} />);
        }
        return <VelocityTransitionGroup className={this.styles.list}
            enter={{
                opacity: 1,
                translateX: 0,
            }}
            leave={{
                opacity: 0,
                translateX: 0,
            }}
            easing={[0.165, 0.840, 0.440, 1.000]}
            duration={250}
        >
        {children}
        </VelocityTransitionGroup>;
    },
};

import React from "react";
import check from "check-types";
import Util from "../../helpers/util";
import Item from "../item";
import Velocity from "velocity-animate";
import VelocityTransitionGroup from "velocity-transition-group";
import Ink from "react-ink";

const delay = 150;

export default {
    isFolder(item) {
        return this.props.folders.indexOf(
            this.getPath(item)
        ) >= 0;
    },
    getReadme(item) {
        return this.props.descriptions[`/${this.getPath(item)}`];
    },
    render() {
        let children = this.props.items && Object.keys(this.props.items).length > 0 && Object.keys(this.props.items).map((item, index) =>
            <Item file={item} content={this.props.items[item]} folder={this.views.isFolder(item)} style={{transitionDelay: index * delay + "ms", opacity: 1, transform: "none"}} readme={this.views.getReadme(item) || null} select={this.select} link={this.link}/>
        );
        if (children && this.props.index && this.props.descriptions[this.props.index]) {
            children.unshift(<Item file="Readme" readme={this.props.descriptions[this.props.index]} style={{transitionDelay: "0ms", opacity: 1, transform: "none"}} />);
        }
        if (this.props.backButton) {
            children.unshift(<div className={this.styles.backButton} onClick={
                () => this.select(
                    this.props.index.substr(0, this.props.index.lastIndexOf("/"))
                , false)
            }><span className={"mdi mdi-chevron-left"} /><Ink /></div>)
        }
        return <span id="wrapper" className={this.styles.list} style={this.props.style || {}}>
            <VelocityTransitionGroup className={this.styles.inner}
                enter={{
                    opacity: 1,
                    translateX: 0,
                }}
                leave={{
                    opacity: 0,
                    translateX: 50,
                }}
                easing={[0.165, 0.840, 0.440, 1.000]}
                duration={250}
            >
            {children}
            </VelocityTransitionGroup>
        </span>;
    },
};

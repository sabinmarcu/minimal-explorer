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
    getReadme(item, limit = this.props.limit, isRoot = false) {
        let cond = (!isRoot ? Util.suffixSlash(this.getPath(item)) : (item === "" ? item : Util.suffixSlash(item))) + "readme.md";
        let descr = this.props.descriptions[cond];
        if (check.string(descr)) {
            if ((limit || -1) >= 0) {
                // return descr.match(new RegExp(`^((?:\<[^>]+\>[^\<]*\<\/[^>]+\>[^<]*){${limit}}).*`), "$1")[1];
                return descr.substr(0, (descr.indexOf("<!--limit-->") >= 0 ? descr.indexOf("<!--limit-->") : descr.length - 1));
            }
            return descr;
        }
        return null;
    },
    getPreview(item, isRoot = false) {
        let cond = (!isRoot ? this.getPath(item) : (item === "" ? item : item));
        let prev = this.props.previews[this.getPath(item)];
        if (check.string(prev)) {
            return Util.suffixSlash(this.getPath(item)) + prev;
        }
        return null;
    },
    render() {
        let children = this.props.items && Object.keys(this.props.items).length > 0 && Object.keys(this.props.items).map((item, index) =>
            <Item
                file={item}
                content={this.props.items[item]}
                folder={this.views.isFolder(item)}
                style={{transitionDelay: delay + index * delay + "ms", ...this.state.finalStyles}}
                readme={this.views.getReadme(item) || null}
                select={this.select}
                expandReadme={this.expandReadme}
                link={this.link}
                previewImage={this.views.getPreview(item)} />
        ) || [];
        let index = this.props.index === "ROOT" ? "" : Util.suffixSlash(this.props.index);
        if (children && this.props.descriptions[index + "readme.md"]) {
            children.unshift(<Item file="Readme" readme={this.views.getReadme(index, (this.props.index === "ROOT" || this.props.displayPreview ? -1 : 2), true)} style={{transitionDelay: "0ms", maxWidth: (this.props.displayPreview ? "800px" : "initial"), ...this.state.finalStyles}} isPrimeReadme={true}/>);
        }
        if (this.props.displayPreview && check.string(this.views.getPreview(this.props.index, true))) {
            children.unshift(<Item previewImage={this.views.getPreview(this.props.index, true)} isOnlyPreview={true}  style={{transitionDelay: delay + "ms", flex: "2 2 500px", ...this.state.finalStyles}} />);
        }
        if (this.props.backButton) {
            children.unshift(<div className={this.styles.backButton} onClick={
                () => this.props.dequeue()
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

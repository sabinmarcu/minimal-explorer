import React from "react";
import marked from "marked";
import ItemsList from "../itemslist";

const opacity = 0.2, blur = 3, translate = 150, rotate = 10, transTime = 1, transFunc = "cubic-bezier(0.165, 0.840, 0.440, 1.000)";

export default {
    paneStyle(folder, focus, folders) {
        let dist = this.distanceTo(folder, focus, folders);
        if (dist < 0) {
            return {
                opacity: 0,
                filter: "none",
                WebkitFilter: "none",
                transform: `translateZ(${translate}px) rotateX(${rotate}deg)`,
                zIndex: -1,
                transition: `all ${transTime}s ${transFunc}`,
            }
        } else {
            if (dist > 0) {
                return {
                    opacity: 0.7 - (dist * opacity < 1 ? dist * opacity : 1),
                    filter: `blur(${dist * blur}px)`,
                    WebkitFilter: `blur(${dist * blur}px)`,
                    transform: `translateZ(-${dist * translate}px) rotateX(-${dist * rotate >= 90 ? 90 : dist * rotate}deg)`,
                    zIndex: 10 - dist,
                    transition: `all ${transTime}s ${transFunc}`,
                }
            }
        }
        return {
            opacity: 1,
            zIndex: 10,
            filter: "none",
            WebkitFilter: "none",
            transform: "none",
            transition: `all ${transTime / 2}s ${transFunc}`,
            transitionDelay: `${transTime / 2}s`,
        }
    },
    render() {
        let activeIndex = this.props.folders.indexOf(this.props.focus), min = activeIndex - 3 >= 0 ? activeIndex - 3 : 0, max = activeIndex + 1 < this.props.folders.length ? activeIndex + 1 : this.props.folders.length - 1, children = [];
        for (let i = min; i <= max; i++) {
            let folder = this.props.folders[i];
            children.push(<ItemsList items={this.props.files[folder]} index={folder} style={this.views.paneStyle(folder, this.props.focus, this.props.folders)} backButton={i > 0}/>)
        }
        return <div className={this.styles.wrapper}>
            <header className={this.styles.header}>
                <h1>{__NAME__}</h1>
                <h2>You're at : {
                        window.location.pathname
                            .replace(__BASEURL__, "")
                            .split("/").filter((it) => it).reduce(
                                (prev, it) => {return {
                                    prefix: prev.prefix + "/" + it,
                                    items:
                                        prev.items.push(<a href={prev.prefix + "/" + it} className={this.styles.link}>{it}</a>) &&
                                        prev.items.push(<span className={this.styles.div}>/</span>) &&
                                        prev.items,
                                }}, {items: [
                                    <span className={this.styles.div}>/</span>,
                                    <a href={__BASEURL__} className={this.styles.link}>{__NAME__}</a>,
                                    <span className={this.styles.div}>/</span>,
                                ], prefix: __BASEURL__.substr(0, __BASEURL__.length - 1)}).items}
                </h2>
            </header>
            <section className={this.styles.content}>
                {children}
            </section>
        </div>;
    },
};

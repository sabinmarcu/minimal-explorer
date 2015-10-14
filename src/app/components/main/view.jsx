import React from "react";
import marked from "marked";
import ItemsList from "../itemslist";
import isMobile from "ismobilejs";

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
    get deviceKind() {
        return isMobile.phone && "device-phone" || isMobile.tablet && "device-tablet" || isMobile.seven_inch && "device-seveninch";
    },
    get deviceMake() {
        return isMobile.apple.device && "apple" || isMobile.android.device && "android" || isMobile.windows.device && "windows";
    },
    get deviceSize() {
        return [
            (this.state.width > 1000 && "device-gt1000"), 
            (this.state.width < 1000 && "device-lt1000"), 
            (this.state.width > 700 && "device-gt700"), 
            (this.state.width < 700 && "device-lt700"),
            (this.state.width > 500 && "device-gt500"), 
            (this.state.width < 500 && "device-lt500"),
            (this.state.width > 300 && "device-gt300"), 
            (this.state.width < 300 && "device-lt300"),
        ].filter(it => it).join(" ");
    },
    render() {
        let activeIndex = this.props.queue.indexOf(this.props.focus), min = activeIndex - 3 >= 0 ? activeIndex - 3 : 0, max = activeIndex + 1 < this.props.queue.length ? activeIndex + 1 : this.props.queue.length - 1, children = [];
        for (let i = min; i <= max; i++) {
            let folder = this.props.queue[i];
            if (folder.indexOf(".") < 0) {
                children.push(<ItemsList items={this.props.files[folder]} index={folder} style={this.views.paneStyle(folder, this.props.focus, this.props.queue)} backButton={i > 0} queue={this.queue} dequeue={this.dequeue} limit={2}/>)
            } else {
                children.push(<ItemsList items={[]} index={folder.substr(0, folder.lastIndexOf("/"))} style={this.views.paneStyle(folder, this.props.focus, this.props.queue)} backButton={i > 0} queue={this.queue} dequeue={this.dequeue} limit={-1} displayPreview={true}/>);
            }
        }
        return <div className={[this.styles.wrapper, this.views.deviceKind, this.views.deviceMake, this.views.deviceSize].join(" ")}>
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

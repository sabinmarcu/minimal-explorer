import React from "react";
import marked from "marked";
import check from "check-types";
import Util from "../../helpers/util";

export default {
    smallTile(item, children, next = <span />) {
        return <span>
            <header className={this.styles.header}>
                {check.string(children[item]) ? children[item] : item}
            </header>
            <section className={this.styles.smallcontent}>
                {next}
            </section>
        </span>;
    },
    bigTile(item, children) {
        return <h1> TBD </h1>;
    },
    fileLayout(item, children) {
        return <li className={this.styles.item + " " + this.styles.file + " "  + this.activeClass(item)}>
            <a href={Util.suffixSlash(window.location) + item}>
                {this.views.smallTile(item, children, <h1 className={this.styles.hint}>Click here to open</h1>)}
            </a>
        </li>;
    },
    folderLayout(item, children) {
        return <li className={this.styles.item + " " + this.activeClass(item)}>
            {this.views.smallTile(item, children)}
        </li>;
    },
    render() {
        return <ul className={this.styles.list}>
            {this.props.items && Object.keys(this.props.items).length > 0 && Object.keys(this.props.items).map((item) =>
                check.string(this.props.items[item]) ? this.views.fileLayout(item, this.props.items) : this.views.folderLayout(item, this.props.items)
            )}
        </ul>;
    },
};

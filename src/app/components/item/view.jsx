import React from "react";
import check from "check-types";
import Util from "../../helpers/util";
import marked from "marked";

export default {
    smallTile(item, children, next = <span />) {
        return <span>
            <header className={this.styles.header}>
                <a href={Util.suffixSlash(window.location) + item}>
                    {check.string(children) ? children : item}
                </a>
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
        return <li className={this.styles.item + " " + this.styles.file} style={this.props.style || {}}>
            <a href={Util.suffixSlash(window.location) + item} className={this.styles.biglink}>
                {this.views.smallTile(item, children, <h1 className={this.styles.hint}>Click here to open</h1>)}
            </a>
        </li>;
    },
    readmeLayout(item, readme) {
        return <li className={this.styles.item + " " + this.styles.readme} style={this.props.style || {}}>
            {this.views.smallTile("readme.md", "Readme", <p className={this.styles.readmeContent} dangerouslySetInnerHTML={{__html: this.props.readme}}></p>)}
        </li>;
    },
    folderLayout(item, children) {
        return <li className={this.styles.item} style={this.props.style || {}}>
            {this.views.smallTile(item, children)}
        </li>;
    },
    render() {
        return check.string(this.props.readme) ?
            this.views.readmeLayout(this.props.file, this.props.readme) :
            (check.string(this.props.content) ?
                this.views.fileLayout(this.props.file, this.props.content) :
                this.views.folderLayout(this.props.file, this.props.content)
            );
    },
};

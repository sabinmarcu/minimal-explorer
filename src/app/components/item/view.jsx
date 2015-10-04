import React from "react";
import check from "check-types";
import Util from "../../helpers/util";
import marked from "marked";
import Ink from "react-ink";

export default class Views {

    // Helpers
    static get classes() {
        let cls = [this.styles.item];
        if (check.string(this.props.readme)) {
            cls.push(this.styles.readme);
            if (this.props.isPrimeReadme) {
                cls.push(this.styles.primereadme);
            }
        } else {
            if (check.string(this.props.content)) {
                cls.push(this.styles.file);
            }
        }
        return cls.join(" ");
    }
    static get openContent() {
        return this.views.link(<h1 className={this.styles.hint}>Click here to open</h1>);
    }
    static get readmeContent() {
        return <span className={this.styles.readmeContent} dangerouslySetInnerHTML={
                {__html: this.props.readme}}>
        </span>;
    }
    static get folderContent() {
        return <h1 className={this.styles.hint}>This is a folder. Use the buttons on the bottom of this card to access its content</h1>;
    }
    static get readmeIcon() {
        return this.views.icon("file-find", this.props.expandReadme || function() {}, "View Readme");
    }
    static get navigateIcon() {
        return this.views.icon("view-list", this.props.select || function() {}, "View folder contents");
    }
    static get linkIcon() {
        return this.views.icon("link", this.props.link || function() {}, "Go to this folder");
    }

    // Partials
    static sectionContent(inner, file = true) {
        return <section className={file ? this.styles.smallcontent : this.styles.bigcontent}>
            {inner}
        </section>;
    }
    static headerContent(inner) {
        return <header className={this.styles.header}>
            {this.views.link(inner)}
        </header>;
    }
    static footerContent(inner) {
        return <footer className={this.styles.footer}>
            {inner}
        </footer>;
    }
    static icon(what, cb, tooltip) {
        return <div className={`${this.styles.icon}`} onClick={() => cb(this.props.file)}>
            <span className={`mdi mdi-${what}`}/>
            {tooltip && <div className={this.styles.tooltip}>{tooltip}</div>}
            <Ink />
        </div>
    }
    static link(inner) {
        return <a onClick={() => this.props.link(this.props.file)} >
            {inner}
        </a>;
    }

    //Layouts
    static get smallLayout() {
        return [
            this.views.headerContent(check.string(this.props.content) ?
                this.props.content :
                this.props.file
            ),
            this.views.sectionContent(check.string(this.props.readme) ?
                this.views.readmeContent :
                this.views.openContent
            ),
        ];
    }
    static get bigLayout() {
        return [
            this.views.headerContent(check.string(this.props.content) ?
                this.props.content :
                this.props.file
            ),
            this.views.sectionContent(check.string(this.props.readme) ?
                this.views.readmeContent :
                this.views.folderContent
            , false),
            this.views.footerContent([
                (check.string(this.props.readme) && this.views.readmeIcon),
                this.views.navigateIcon,
                this.views.linkIcon,
            ]),
        ];
    }
    static get layout() {
        return <li className={this.views.classes} style={this.props.style || {}}>
            {this.props.folder ? this.views.bigLayout : this.views.smallLayout}
        </li>;
    }

    // Putting it all together
    static render() {
        return this.views.layout;
    }
};

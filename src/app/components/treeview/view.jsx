import React from "react";
import check from "check-types";
import TreeView from "./index";

export default {
    render() {
        return <span>
            <span ref="header" className={this.styles.header}>
                <span className={this.styles.icon} onClick={this.toggle}>
                    <span className={"mdi " + (this.state.open && !this.props.disabled && "mdi-folder-multiple" || "mdi-folder")}></span>
                </span>
                <a href={window.location + (this.props.prefix || "")} className={this.styles.link}>
                    <span className={this.styles.text}>{this.props.title || "Toggle"}</span>
                </a>
            </span>
            <ul ref="list" className={this.styles.list + " " + (this.state.open && this.styles.active || this.styles.inactive) + " " + this.props.className}>
                {this.props.branch && Object.keys(this.props.branch).length > 0 && Object.keys(this.props.branch).map((item) =>
                    <li className={this.styles.header + " " + this.styles.listitem}>
                            {(check.string(this.props.branch[item]) || this.props.branch[item]["_noindex"]) &&
                                <a href={window.location + (this.props.prefix || "") + item} className={this.styles.link}>
                                    <span className={this.styles.listitem}>
                                        <span className={this.styles.icon}>
                                            <span className={"mdi mdi-file"}></span>
                                        </span>
                                        <span className={this.styles.text}>
                                            {check.string(this.props.branch[item]) && this.props.branch[item] || item}
                                        </span>
                                    </span>
                                </a> ||
                                <TreeView branch={this.props.branch[item]} title={item} className={this.styles.next + " " + this.styles.listitem} prefix={(this.props.prefix || "") + item + "/"}/>}
                    </li>)}
            </ul>
        </span>;
    },
};

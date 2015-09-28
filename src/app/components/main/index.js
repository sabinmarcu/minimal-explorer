import React from "react";
import EnhancedComponent from "../baseComponent";
import { connect }  from "react-redux";
import Util from "../../helpers/util";
import _ from "underscore";
import marked from "marked";

@connect((state) => {
    return {
        files: state.main.rawfiles,
        descriptions: state.main.descriptions,
    }
})
export default class Main extends EnhancedComponent {

    static propTypes = {
        files: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    componentDidMount() {
        Util.getFiles((files) => {
            this.props.dispatch(Util.actions.main.addFiles(files))
            console.log("Getting Folders");
            let Folders = new Set();
            files.split("\n").map(
                (it) => it.split("/").filter((it, i, a) => i < a.length - 1 ? it : undefined).reduce(
                    (p, i) => (i.indexOf(".") < 0 && Folders.add(p + "/" + i) && p + "/" + i) || p
                , "")
            );
            Folders.forEach((it) => {
                console.log("GETTING DESCRIPTION FOR ", it, Util.suffixSlash(window.location) + Util.suffixSlash(it));
                Util.getDescription(
                    (file) => console.log(it, file)
                , Util.suffixSlash(window.location) + Util.suffixSlash(it))
            });
        });
        Util.getDescription((file) =>
            this.props.dispatch(Util.actions.main.addDescription(marked(file), "ROOT"))
        );
    }

    constructor(...args) {
        super(require, ...args);
    }
}

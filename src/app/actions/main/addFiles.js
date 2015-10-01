import check from "check-types";
import _ from "lodash";
import marked from "marked";

export default (obj) => {
    let {folders, descriptions} = obj;
    let computeFunction = (files) => files.reduce((prev, it) => {
            let s = it.split("/"), f, l = prev;
            while (s.length > 1) {
                let n = s.shift();
                l[n] = (l[n] && !check.string(l[n]) && l[n]) || {};
                l = l[n];
            }
            f = s[0];
            if (!_.contains(["index.html", "bootstrap.js", "app.js", "readme.md"], f)) {
                l[f] = l[f] || (f.indexOf(".") >= 0 && f.substr(0, f.lastIndexOf(".")) || f);
            }
            return prev;
        }, {});
    let filesMap = folders.reduce((acc, folder) =>
        (acc[folder === "" ? "ROOT" : folder] = folder.split("/").reduce((prev, it) => prev[it] || prev, computeFunction(obj.files.map((file) =>
                file.match(new RegExp(`^${folder}\/?[^\/]+$`))
            ).map(it => it ? it[0] : undefined).filter(it => it))
        )) && acc
    , {});
    folders = folders.map((it) => it === "" ? "ROOT" : it);
    descriptions = Object.keys(descriptions).reduce(
        (prev, it) => (prev[it] = marked(descriptions[it])) && prev
    , {});
    return { folders, filesMap, descriptions };
};


// x.forEach((it) => y.add(it.substr(0, it.lastIndexOf("/"))) )

import check from "check-types";
import _ from "lodash";
export default (files) => {
    let rawfiles = files.split("\n").map((i) => i.length > 0 && i).filter((it) => it);
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
    let computedfiles = computeFunction(rawfiles);
    let folders = [
        ...rawfiles.reduce((prev, it) =>
            prev.add(it.substr(0, it.lastIndexOf("/"))) && prev
        , new Set()),
    ];
    let filesMap = folders.reduce((acc, folder) =>
        (acc[folder === "" ? "ROOT" : folder] = folder.split("/").reduce((prev, it) => prev[it] || prev, computeFunction(rawfiles.map((file) =>
                file.match(new RegExp(`^${folder}\/?[^\/]+$`))
            ).map(it => it ? it[0] : undefined).filter(it => it))
        )) && acc
    , {});
    folders = folders.map((it) => it === "" ? "ROOT" : it);
    return {folders, filesMap};
};


// x.forEach((it) => y.add(it.substr(0, it.lastIndexOf("/"))) )

import check from "check-types";
import _ from "underscore";
export default (files) => true && {
    files: files
        .split("\n")
        .map((i) => i.length > 0 && i)
        .filter((it) => it)
        .reduce((prev, it) => {
            let s = it.split("/"), f, l = prev;
            while (s.length > 1) {
                let n = s.shift();
                l[n] = (l[n] && !check.string(l[n]) && l[n]) || {};
                l = l[n];
            }
            f = s[0];
            if (f.toLowerCase() !== "index.html" && f.toLowerCase() !== "bootstrap.js" && f.toLowerCase() !== "app.js") {
                l[f] = l[f] || (f.indexOf(".") >= 0 && f.substr(0, f.lastIndexOf(".")) || f);
            }
            return prev;
        }, {}),
}


// true && { files: files.split("\n").map((i) => i.length > 0 && i).filter((it) => it) };

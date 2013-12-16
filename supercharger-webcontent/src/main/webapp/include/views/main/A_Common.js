function createMyNamespace() {
    var a = arguments,
        o = window,
        i = 0,
        j = 0,
        tok = null,
        name = null;

    // iterate on the arguments   
    for (; i < a.length; i = i + 1) {
        tok = a[i].split(".");

        // iterate on the object tokens   
        for (j = 0; j < tok.length; j = j + 1) {
            name = tok[j];
            o[name] = o[name] || {};
            o = o[name];
        }
    }

    return o;
}
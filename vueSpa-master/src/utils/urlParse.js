/**
 * url解析
 * @require _.js
 */
window.RUtils.urlParse = (function() {
    var forEach = function(str) {
        var i, l, n,
            o = {},
            arr = str.substr(1).split("&");

        for (i = 0, l = arr.length; i < l; i++) {
            n = arr[i].split("=");
            o[n[0]] = n[1];
        }

        return o;
    };
    return function() {
        return {
            search: forEach(location.search),
            hash: forEach(location.hash)
        };
    };
}());

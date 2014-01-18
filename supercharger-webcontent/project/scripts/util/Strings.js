define([], function () {

    var Strings = {};

    /**
     *
     */
    Strings.padLeft = function (string, padString, length) {
        var result = '' + string;
        while (result.length < length) {
            result = padString + result;
        }
        return result;
    }


    return Strings;

});
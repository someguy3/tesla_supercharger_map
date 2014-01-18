define([], function () {

    var Dates = {};

    /**
     *  Creates a date from a string with this format: YYYY-MM-DD
     */
    Dates.fromString = function (string) {
        var parts = string.split('-');
        if (parts.length == 3) {
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        return null;
    };

    Dates.toString = function (date) {
        if (date == null) {
            return "";
        }
        var year = (1900 + date.getYear());
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        return year + "-" + Dates.padLeft(month, "0", 2) + "-" + Dates.padLeft(day, "0", 2);

    };

    Dates.padLeft = function (string, padString, length) {
        var result = '' + string;
        while (result.length < length) {
            result = padString + result;
        }
        return result;
    }


    return Dates;

});
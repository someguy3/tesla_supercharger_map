define(['util/Strings'], function (Strings) {

    var Dates = {};

    /**
     *  Creates a date from a string with this format: YYYY-MM-DD
     */
    Dates.fromString = function (string) {
        var parts = string.split('-');
        if (parts.length === 3) {
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        return null;
    };

    Dates.toString = function (date) {
        if (date == null) {
            return "";
        }
        var year = date.getFullYear();
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        return year + "-" + Strings.padLeft(month, "0", 2) + "-" + Strings.padLeft(day, "0", 2);

    };

    return Dates;

});
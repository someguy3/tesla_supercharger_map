define(['util/Strings', 'util/Objects'], function (Strings, Objects) {

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

    /**
     * Converts a date object to a string with format YYYY-MM-DD
     */
    Dates.toString = function (date) {
        if (Objects.isNullOrUndefined(date)) {
            return "";
        }
        return date.getFullYear() + "-" + Strings.padLeft((date.getMonth() + 1), "0", 2) + "-" + Strings.padLeft(date.getDate(), "0", 2);
    };

    return Dates;

});
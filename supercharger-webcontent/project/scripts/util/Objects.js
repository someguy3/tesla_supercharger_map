define([], function () {

    var Strings = {};

    /**
     *
     */
    Strings.nullSafeToString = function (object) {
        return Strings.isNullOrUndefined(object) ? "" : object.toString();
    };

    /**
     *
     */
    Strings.isNullOrUndefined = function (object) {
        return ((object === null) || (typeof object === 'undefined'));
    }

    return Strings;

});
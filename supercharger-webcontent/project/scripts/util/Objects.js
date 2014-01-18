define([], function () {

    var Objects = {};

    /**
     *
     */
    Objects.nullSafeToString = function (object) {
        return Objects.isNullOrUndefined(object) ? "" : object.toString();
    };

    /**
     *
     */
    Objects.isNullOrUndefined = function (object) {
        return ((object === null) || (typeof object === 'undefined'));
    }

    return Objects;

});
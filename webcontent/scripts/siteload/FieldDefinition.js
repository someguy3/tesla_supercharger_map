define([], function () {

    /**
     *
     * @constructor
     */
    var FieldDefinition = function (name, required, parseFunction) {
        this.name = name;
        this.required = required;
        this.parseFunciton = parseFunction;
    };

    return FieldDefinition;


});
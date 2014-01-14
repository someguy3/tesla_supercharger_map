define([], function () {

    var Asserts = {};

    /**
     * Throws an error if the specified object is not an Integer.
     */
    Asserts.isInteger = function (testArg, message) {
        if (!((typeof testArg === "number") && (Math.floor(testArg) === testArg))) {
            throw new Error(message);
        }
    };

    return Asserts;
});
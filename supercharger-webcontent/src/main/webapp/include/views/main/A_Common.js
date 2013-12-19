var redshiftsoft = {};

redshiftsoft.Assert = {};

redshiftsoft.Assert.isInteger = function (foo, message) {
    if (!((typeof foo === "number") && (Math.floor(foo) === foo))) {
        throw new Error(message);
    }
};


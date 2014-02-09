define([], function () {

    var Status = {
        PLANNED: {value: 0, displayName: "Planned"},
        CONSTRUCTION: {value: 1, displayName: "Under Construction"},
        OPEN: {value: 2, displayName: "Open"}
    };

    Status.fromString = function (string) {
        var s = string.trim();
        if (s === 'PLANNED') {
            return Status.PLANNED;
        } else if (s === 'CONSTRUCTION') {
            return Status.CONSTRUCTION;
        } else if (s === 'OPEN') {
            return Status.OPEN;
        }
        throw new Error("invalid status: " + string);
    };

    return Status;

});
define([], function () {

    var Status = {
        PLANNED: {
            value: 0,
            displayName: "Planned",
            iconUrl: 'images/dots/green_dot_16.png'
        },
        CONSTRUCTION: {
            value: 1,
            displayName: "Construction",
            iconUrl: 'images/construction-cone.png'
        },
        OPEN: {
            value: 2,
            displayName: "Open",
            iconUrl: 'images/dots/red_dot_16.png'
        },
        USER_ADDED: {
            value: 3,
            displayName: "Custom",
            iconUrl: 'images/dots/blue_dot_16.png'
        }
    };

    Status.fromString = function (string) {
        var s = string.trim();
        if (s === 'PLANNED') {
            return Status.PLANNED;
        } else if (s === 'CONSTRUCTION') {
            return Status.CONSTRUCTION;
        } else if (s === 'OPEN') {
            return Status.OPEN;
        } else if (s === 'USER_ADDED') {
            return Status.USER_ADDED;
        }
        throw new Error("invalid status: " + string);
    };

    return Status;

});
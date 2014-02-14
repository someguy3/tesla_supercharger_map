define([], function () {

    var Status = {
        PERMIT: {
            value: 'PERMIT',
            displayName: "Permit",
            iconUrl: 'images/dots/blue_dot_16.png'
        },
        CONSTRUCTION: {
            value: 'CONSTRUCTION',
            displayName: "Construction",
            iconUrl: 'images/construction-cone.png'
        },
        OPEN: {
            value: 'OPEN',
            displayName: "Open",
            iconUrl: 'images/dots/red_dot_16.png'
        },
        USER_ADDED: {
            value: 'USER_ADDED',
            displayName: "Custom",
            iconUrl: 'images/dots/green_dot_16.png'
        }
    };

    Status.fromString = function (string) {
        var s = string.trim();
        if (s === 'PERMIT') {
            return Status.PERMIT;
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
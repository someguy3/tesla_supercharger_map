define(['site/Address', 'site/SiteStatus', 'util/Objects'], function (Address, Status, Objects) {


        /**
         * Properties:
         *
         * Other properties that are later added to the supercharger data structure:
         *
         * id           -- [Integer] uniquely identifies each record.
         * circle       -- [google.maps.Circle] a reference to the google-maps Circle object indicating range for this supercharger.
         * marker       -- [google.maps.Marker] a reference to the google-maps Marker object associated with this supercharger.
         *
         * @constructor
         */
        var Supercharger = function () {
            this.address = new Address();
            this.count = true;
            this.status = Status.OPEN;
        };

        Supercharger.buildNewCustom = function (id, displayName, location) {
            var supercharger = new Supercharger();
            supercharger.id = id;
            supercharger.displayName = displayName;
            supercharger.address = new Address("", "", "", "", "");
            supercharger.location = location;
            supercharger.count = false;
            supercharger.status = Status.USER_ADDED;
            return supercharger;
        };

        Supercharger.prototype.isPermit = function () {
            return this.status === Status.PERMIT;
        };
        Supercharger.prototype.isConstruction = function () {
            return this.status === Status.CONSTRUCTION;
        };
        Supercharger.prototype.isOpen = function () {
            return this.status === Status.OPEN;
        };
        Supercharger.prototype.isUserAdded = function () {
            return this.status === Status.USER_ADDED;
        };

        Supercharger.prototype.hasOpenDate = function () {
            return Objects.isNotNullOrUndef(this.dateOpened);
        };

        Supercharger.prototype.toString = function () {
            return JSON.stringify(this);
        };

        return Supercharger;
    }
);
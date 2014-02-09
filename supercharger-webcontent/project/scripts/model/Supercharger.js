define(['model/Address'], function (Address) {


        /**
         * Properties:
         *
         * Other properties that are later added to the supercharger data structure:
         *
         * id           -- [Integer] uniquely identifies each record.
         * circle       -- [google.maps.Circle] a reference to the google-maps Circle object indicating range for this supercharger.
         * marker       -- [google.maps.Marker] a reference to the google-maps Marker object associated with this supercharger.
         * custom       -- [Boolean] true indicates that this is a custom marker added by the customer.
         *
         * @constructor
         */
        var Supercharger = function () {
            this.address = new Address();
            this.count = true;
        };


        return Supercharger;

    }
);
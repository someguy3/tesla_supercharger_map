define(function () {

        /**
         *
         * @constructor
         */
        var Address = function (street, city, state, zip, country) {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.country = country;
        };

        Address.prototype.isUSA = function () {
            return this.country === "USA";
        };


        return Address;

    }
);
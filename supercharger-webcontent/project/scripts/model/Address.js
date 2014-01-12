define(function () {

        var Address = function (street, city, state, zip, country) {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.country = country;
        };

        Address.create = function (street, city, state, zip, country) {
            return new Address(street, city,state, zip, country);
        };

        return Address;

    }
);
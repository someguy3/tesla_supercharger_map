define(
    ['model/Address', 'util/Asserts', 'util/Objects', 'util/Dates'],
    function (Address, Asserts, Objects, Dates) {

    /**
     * Constructor
     */
    var SuperchargerData = function () {
    };

    SuperchargerData.prototype.size = function () {
        return SuperchargerData.LIST.length;
    };

    SuperchargerData.prototype.get = function (index) {
        return SuperchargerData.LIST[index];
    };

    SuperchargerData.prototype.getById = function (id) {
        Asserts.isInteger(id, "id must be an integer");
        for (var i = 0; i < SuperchargerData.LIST.length; i++) {
            var supercharger = SuperchargerData.LIST[i];
            if (supercharger.id === id) {
                return supercharger;
            }
        }
        return null;
    };

    SuperchargerData.prototype.removeById = function (id) {
        Asserts.isInteger(id, "id must be an integer");
        for (var index = 0; index < SuperchargerData.LIST.length; index++) {
            var supercharger = SuperchargerData.LIST[index];
            if (supercharger.id === id) {
                SuperchargerData.LIST.splice(index, 1);
                break;
            }
        }
    };

    SuperchargerData.prototype.addSupercharger = function (displayName, location) {
        var charger = {
            "id": this.size() + 10000,
            "displayName": displayName,
            "address": new Address("", "", "", "", ""),
            "location": location,
            "url": null,
            "count": false,
            "custom": true
        };
        SuperchargerData.LIST.push(charger);
        return charger;
    };




    return SuperchargerData;
});
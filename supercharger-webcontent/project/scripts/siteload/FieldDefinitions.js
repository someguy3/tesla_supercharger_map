define(['siteload/FieldDefinition', 'util/Dates'], function (FieldDefinition, Dates) {

    var I = function (supercharger, key, value) {
        supercharger[key] = value;
    };

    var DISPLAY_NAME = function (supercharger, key, value) {
        supercharger.displayName = value;
    };

    var ADDRESS = function (supercharger, key, value) {
        supercharger.address[key] = value;
    };

    var GPS = function (supercharger, key, value) {
        var i = value.indexOf(',');
        var lat = value.substr(0, i).trim();
        var lon = value.substr(i + 1).trim();
        supercharger.location = new google.maps.LatLng(lat, lon);
    };

    var BOOLEAN = function (supercharger, key, value) {
        supercharger[key] = (value === 'true');
    };

    var DATE = function (supercharger, key, value) {
        supercharger[key] = Dates.fromString(value);
    };

    /**
     *
     * @constructor
     */
    var FieldDefinitions =
    {
        'name': new FieldDefinition('name', true, DISPLAY_NAME),

        'street': new FieldDefinition('street', true, ADDRESS),
        'city': new FieldDefinition('city', true, ADDRESS),
        'state': new FieldDefinition('state', true, ADDRESS),
        'zip': new FieldDefinition('zip', true, ADDRESS),
        'country': new FieldDefinition('country', true, ADDRESS),

        'gps': new FieldDefinition('gps', true, GPS),

        'url': new FieldDefinition('url', true, I),

        'urlDiscuss': new FieldDefinition('urlDiscuss', false, I),

        'dateOpened': new FieldDefinition('dateOpened', false, DATE),

        'construction': new FieldDefinition('construction', false, BOOLEAN),

        'count': new FieldDefinition('count', true, BOOLEAN)
    };


    return FieldDefinitions;


})
;
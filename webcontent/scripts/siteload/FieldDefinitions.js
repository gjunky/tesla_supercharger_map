define(['siteload/FieldDefinition', 'util/Dates', 'site/SiteStatus'], function (FieldDefinition, Dates, SiteStatus) {

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
        var commonPos = value.indexOf(',');
        var lat = value.substr(0, commonPos).trim();
        var lon = value.substr(commonPos + 1).trim();
        supercharger.location = new google.maps.LatLng(lat, lon);
    };

    var BOOLEAN = function (supercharger, key, value) {
        var upperValue = value.toUpperCase();
        if (upperValue !== 'TRUE' && upperValue !== 'FALSE') {
            throw new Error("bad boolean value '" + value + "' in supercharger=" + JSON.stringify(supercharger));
        }
        supercharger[key] = (upperValue === 'TRUE');
    };

    var DATE = function (supercharger, key, value) {
        try {
            supercharger[key] = Dates.fromString(value);
        } catch (error) {
            throw new Error("bad date value '" + value + "' in supercharger=" + JSON.stringify(supercharger));
        }
    };

    var STATUS = function (supercharger, key, value) {
        supercharger[key] = SiteStatus.fromString(value);
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
        'state': new FieldDefinition('state', false, ADDRESS),
        'zip': new FieldDefinition('zip', true, ADDRESS),
        'country': new FieldDefinition('country', true, ADDRESS),

        'gps': new FieldDefinition('gps', true, GPS),
        'elevation': new FieldDefinition('elevation', true, I),

        'url': new FieldDefinition('url', true, I),

        'urlDiscuss': new FieldDefinition('urlDiscuss', false, I),

        'dateOpened': new FieldDefinition('dateOpened', false, DATE),

        'status': new FieldDefinition('construction', false, STATUS),

        'count': new FieldDefinition('count', false, BOOLEAN)
    };


    return FieldDefinitions;


})
;
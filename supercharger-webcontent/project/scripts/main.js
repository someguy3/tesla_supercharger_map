requirejs.config({});


// Start the main app logic.
requirejs([ 'page/map/MapPage' ], function (MapPage) {

    /**
     * ON DOCUMENT READY
     */
    $(document).ready(function () {
        var mapPage = new MapPage();
        mapPage.loadPage();
    });

});
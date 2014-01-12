requirejs.config({
    //By default load any module IDs from scrips/lib
    baseUrl: 'scripts/lib',
    //except, if the module ID starts with "app",
    //load it from the scripts/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'jquery-ui', 'canvas', 'app/sub'],
    function ($, canvas, sub) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
    });
define([], function () {
    /**
     *
     * @constructor
     */
    var NavBarToAboutPage = function () {
    }

    NavBarToAboutPage.prototype.loadPage = function () {
        var pageAbout = $("#page-about");
        if (!pageAbout.data('about-tab-initialized')) {
            jQuery.getJSON("version.json", function (data) {
                pageAbout.append("" +
                    "<br/>" +
                    "<b>Last Updated: </b>" + data.buildTimestamp + "<br/>" +
                    "<br/>" +
                    "Send updates/corrections to <b>map" + "@tes" + "lawiki.net</b>" +
                    "<br/>"
                );
                pageAbout.data('about-tab-initialized', true);
            });
        }
    };

    return NavBarToAboutPage;
});
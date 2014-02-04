define([], function () {
    /**
     *
     * @constructor
     */
    var AboutPage = function () {
        this.page = $("#page-about");
        this.versionContainer = $("#page-about-version-container");
    };

    AboutPage.INIT_PROP = 'page-initialized';

    AboutPage.prototype.onPageShow = function () {
        if (!this.page.data(AboutPage.INIT_PROP)) {
            this.loadVersionInfo();
        }
    };

    AboutPage.prototype.loadVersionInfo = function () {
        jQuery.getJSON("version.json", jQuery.proxy(this.handleVersionInfo, this));
    };

    AboutPage.prototype.handleVersionInfo = function (data) {
        this.versionContainer.append("" +
            "" +
            "<b>Last Updated: </b>" + data.buildTimestamp + "<br/>" +
            "Send updates/corrections to <b>map" + "@superch" + "arge.info</b>" +
            "<br/>"
        );
        this.page.data(AboutPage.INIT_PROP, true);
    };

    return AboutPage;
});
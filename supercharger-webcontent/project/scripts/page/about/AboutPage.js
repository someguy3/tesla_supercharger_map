define([], function () {
    /**
     *
     * @constructor
     */
    var AboutPage = function () {
        this.pageAbount = $("#page-about");
        this.versionContainer = $("#page-about-version-container");
    }

    AboutPage.INIT_PROP = 'about-tab-initialized';

    AboutPage.prototype.loadPage = function () {
        if (!this.pageAbount.data(AboutPage.INIT_PROP)) {
            this.loadVersionInfo();
        }
    };

    AboutPage.prototype.loadVersionInfo = function () {
        jQuery.getJSON("version.json", jQuery.proxy(this.handleVersionInfo, this));
    };

    AboutPage.prototype.handleVersionInfo = function (data) {
        this.versionContainer.append("" +
            "<br/>" +
            "<b>Last Updated: </b>" + data.buildTimestamp + "<br/>" +
            "<br/>" +
            "Send updates/corrections to <b>map" + "@tes" + "lawiki.net</b>" +
            "<br/>"
        );
        this.pageAbount.data(AboutPage.INIT_PROP, true);
    };

    return AboutPage;
});
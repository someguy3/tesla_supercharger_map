var redshiftsoft = redshiftsoft || {};

/**
 * Constructor
 */
redshiftsoft.NavBar = function () {
    this.navBarMapActionHandler = new redshiftsoft.NavBarMapAction();
    this.currentPage = "map";
    this.initListeners();
};

redshiftsoft.NavBar.prototype.initListeners = function () {
    $("#navbar-menu-item-list").find("a").click(jQuery.proxy(this.handlePageChange, this));
    $("#navbar-dropdown-menu-item-list").find("a").click(jQuery.proxy(this.navBarMapActionHandler.handleAction, this.navBarMapActionHandler));
};

redshiftsoft.NavBar.prototype.handlePageChange = function (event) {
    var eventDetail = redshiftsoft.eventDetail(event);

    this.hidePage();
    this.currentPage = eventDetail.actionName;
    this.showPage();

    if ("map" === this.currentPage) {
        $("#navbar-map-dropdown").show();
        $("#navbar-map-search").show();
    } else {
        $("#navbar-map-dropdown").hide();
        $("#navbar-map-search").hide();
    }

    if ("about" === this.currentPage) {
        this.populateAboutPage();
    }
};

redshiftsoft.NavBar.prototype.hidePage = function () {
    $("#page-" + this.currentPage).hide();
    $("#page-link-" + this.currentPage).closest("li").removeClass("active");
};

redshiftsoft.NavBar.prototype.showPage = function () {
    $("#page-" + this.currentPage).show();
    $("#page-link-" + this.currentPage).closest("li").addClass("active");
};

redshiftsoft.NavBar.prototype.populateAboutPage = function () {
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
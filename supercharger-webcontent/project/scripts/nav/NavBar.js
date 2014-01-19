define(
    [
        'nav/NavBarDropdown', 'util/Events',
        'page/map/MapPage', 'page/data/DataPage', "page/charts/ChartsPage", 'page/changes/ChangesPage', 'page/about/AboutPage'
    ],
    function (NavBarDropdown, Events, MapPage, DataPage, ChartsPage, ChangesPage, AboutPage) {


        /**
         * Constructor
         */
        var NavBar = function () {
            this.navBarDropdown = new NavBarDropdown();
            this.currentPage = "map";

            this.mapPage = new MapPage();
            this.dataPage = new DataPage();
            this.chartsPage = new ChartsPage();
            this.changesPage = new ChangesPage();
            this.aboutPage = new AboutPage();

            this.initListeners();
        };

        NavBar.prototype.initListeners = function () {
            $("#navbar-menu-item-list").find("a").click(jQuery.proxy(this.handlePageChangeClick, this));
            $("#navbar-dropdown-menu-item-list").find("a").click(jQuery.proxy(this.navBarDropdown.handleAction, this.navBarDropdown));
        };

        NavBar.prototype.handlePageChangeClick = function (event) {
            var eventDetail = Events.eventDetail(event);
            this.changePage(eventDetail.actionName);
        };

        NavBar.prototype.changePage = function (newPageName) {
            this.hideCurrentPage();
            this.currentPage = newPageName;
            this.showCurrentPage();

            if ("map" == this.currentPage) {
                this.mapPage.onPageShow();
            } else {
                this.mapPage.onPageHide();
            }
            if ("data" === this.currentPage) {
                this.dataPage.onPageShow();
            }
            if ("charts" === this.currentPage) {
                this.chartsPage.onPageShow();
            }
            if ("changes" === this.currentPage) {
                this.changesPage.onPageShow();
            }
            if ("about" === this.currentPage) {
                this.aboutPage.onPageShow();
            }
        };

        NavBar.prototype.hideCurrentPage = function () {
            $("#page-" + this.currentPage).hide();
            $("#page-link-" + this.currentPage).closest("li").removeClass("active");
        };

        NavBar.prototype.showCurrentPage = function () {
            $("#page-" + this.currentPage).show();
            $("#page-link-" + this.currentPage).closest("li").addClass("active");
        };

        return NavBar;

    });
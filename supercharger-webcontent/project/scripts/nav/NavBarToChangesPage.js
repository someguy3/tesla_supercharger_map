define(['jquery'], function ($) {
    /**
     *
     * @constructor
     */
    var NavBarToChangesPage = function () {
    }

    NavBarToChangesPage.prototype.load = function () {
        var changesPage = $("#page-changes");
        if (!changesPage.data('changes-tab-initialized')) {
            jQuery.get("changelog.txt", "", function (data) {
                changesPage.append(data);
                changesPage.data('changes-tab-initialized', true);
            }, "html");
        }
    };

    return NavBarToChangesPage;
});
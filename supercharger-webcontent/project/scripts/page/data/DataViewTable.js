define(['util/Objects', 'site/SiteIterator', 'util/Dates', 'lib/stupidtable' ], function (Objects, SiteIterator, Dates) {

    /**
     * Constructor
     */
    var DataViewTable = function () {
        this.superChargerDataTable = $("#supercharger-data-table");
    };

    DataViewTable.DEFAULT_DISCUSS_URL = "http://www.teslamotorsclub.com/forumdisplay.php/77-Charging-Standards-and-Infrastructure";

    DataViewTable.prototype.createTable = function () {
        this.appendTableContent();
        this.setupTableSortPlugin();
    };

    DataViewTable.prototype.appendTableContent = function () {

        var tableBodyData = this.superChargerDataTable.find("tbody");

        new SiteIterator().iterate(
            function (supercharger) {
                tableBodyData.append("" +
                    "<tr>" +
                    "<td>" + supercharger.displayName + "</td>" +
                    "<td>" + supercharger.address.street + "</td>" +
                    "<td>" + supercharger.address.city + "</td>" +
                    "<td>" + supercharger.address.state + "</td>" +
                    "<td>" + supercharger.address.zip + "</td>" +
                    "<td>" + supercharger.address.country + "</td>" +
                    "<td class='gps'>" + supercharger.location.toUrlValue().replace(",",", ") + "</td>" +
                    "<td>" + (supercharger.isConstruction() ? "Construction" : "Open") + "</td>" +
                    "<td>" + Dates.toString(supercharger.dateOpened) + "</td>" +
                    "<td class='link'>" + asLink(supercharger.url, "SC") + "</td>" +
                    "<td class='link'>" + buildDiscussionLink(supercharger) + "</td>" +
                    "</tr>"
                );
            }
        );
    };

    function buildDiscussionLink(supercharger) {
        return (Objects.isNullOrUndef(supercharger.urlDiscuss) ?
            asLink(DataViewTable.DEFAULT_DISCUSS_URL, "forum") :
            asLink(supercharger.urlDiscuss, "thread"));
    }

    function asLink(href, content) {
        return "<a href='" + href + "'>" + content + "</a>";
    }

    DataViewTable.prototype.setupTableSortPlugin = function () {
        var table = $("#supercharger-data-table").stupidtable({});

        table.on("aftertablesort", function (event, data) {
            var th = $(this).find("th");
            th.find(".arrow").remove();
            var dir = $.fn.stupidtable.dir;

            var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
            th.eq(data.column).append('<span class="arrow">&nbsp;' + arrow + '</span>');
        });

    };


    return DataViewTable;

});
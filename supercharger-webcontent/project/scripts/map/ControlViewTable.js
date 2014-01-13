define(['jquery', 'data/SuperchargerData' ], function (jQuery, SuperchargerData) {

    /**
     * Constructor
     */
    var ControlViewTable = function () {

        this.superChargerDataTable = $("#supercharger-data-table");

        this.superData = new SuperchargerData();

        this.draw();
    };

    ControlViewTable.prototype.draw = function () {

        var tableBodyData = this.superChargerDataTable.find("tbody");

        for (var i = 0; i < this.superData.size(); i++) {
            var supercharger = this.superData.get(i);

            tableBodyData.append("" +
                "<tr>" +
                "<td>" + supercharger.displayName + "</td>" +
                "<td>" + supercharger.address.street + "</td>" +
                "<td>" + supercharger.address.city + "</td>" +
                "<td>" + supercharger.address.state + "</td>" +
                "<td>" + supercharger.address.zip + "</td>" +
                "<td>" + supercharger.address.country + "</td>" +
                "<td class='gps'>" + supercharger.location.toUrlValue() + "</td>" +
                "<td>" + (supercharger.construction ? "Construction" : "Open") + "</td>" +
                "<td class='tog'>" + "<a href='" + supercharger.url + "'>link</a></td>" +
                "</tr>"
            );
        }
    };

    return ControlViewTable;

});
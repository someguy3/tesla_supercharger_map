redshiftsoft = createMyNamespace("redshiftsoft");

/**
 *
 * @constructor
 */
redshiftsoft.ControlView_Table = function () {

    this.superChargerMarkTable = $("#supercharger-mark-table");
    this.superChargerDataTable = $("#supercharger-data-table");

    this.superData = new redshiftsoft.SuperchargerData();

    this.draw();

    this.superChargerMarkTable.click(jQuery.proxy(this.handleTableClick, this));
}

redshiftsoft.ControlView_Table.prototype.draw = function () {

    var tableBodyMark = this.superChargerMarkTable.find("tbody");
    var tableBodyData = this.superChargerDataTable.find("tbody");

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        tableBodyMark.append("" +
            "<tr>" +
            "<td>" + supercharger.displayName + "</td>" +
            "<td>" + supercharger.address.state + "</td>" +
            "<td>" + supercharger.address.country + "</td>" +
            "<td>" + "<a href='" + supercharger.url + "'>link</a></td>" +
            "<td class='tog'>" + "on" + "</td>" +
            "<td class='tog'>" + "off" + "</td>" +
            "</tr>"
        );

        tableBodyData.append("" +
            "<tr>" +
            "<td>" + supercharger.displayName + "</td>" +
            "<td>" + supercharger.address.street + "</td>" +
            "<td>" + supercharger.address.city + "</td>" +
            "<td>" + supercharger.address.state + "</td>" +
            "<td>" + supercharger.address.zip + "</td>" +
            "<td>" + supercharger.address.country + "</td>" +
            "<td>" + "<a href='" + supercharger.url + "'>link</a></td>" +
            "</tr>"
        );


    }

};

redshiftsoft.ControlView_Table.prototype.handleTableClick = function (event) {
    var node = $(event.target);

    /* Find a node we are interested in */
    while (!node.is("td")) {
        node = node.parent();
    }

    if (node.hasClass("tog")) {
        if (node.text() == "on") {
            node.text("off")
        }
        else {
            node.text("on")
        }
    }
};
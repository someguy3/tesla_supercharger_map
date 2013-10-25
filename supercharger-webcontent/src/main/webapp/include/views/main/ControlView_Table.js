redshiftsoft = createMyNamespace("redshiftsoft");

/**
 *
 * @constructor
 */
redshiftsoft.ControlView_Table = function () {
    this.superData = new redshiftsoft.SuperchargerData();
    this.superChargerTable = $("#supercharger-table");
    this.draw();

    this.superChargerTable.click(jQuery.proxy(this.handleTableClick, this));
}

redshiftsoft.ControlView_Table.prototype.draw = function () {

    var tableBody = this.superChargerTable.find("tbody");

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        tableBody.append("" +
            "<tr>" +
            "<td>" + supercharger.displayName + "</td>" +
            "<td>" + supercharger.address.street + "</td>" +
            "<td>" + supercharger.address.city + "</td>" +
            "<td>" + supercharger.address.state + "</td>" +
            "<td>" + supercharger.address.zip + "</td>" +
            "<td>" + supercharger.address.country + "</td>" +
            "<td>" + "<a href='" + supercharger.url + "'>link</a></td>" +
            "<td class='tog'>" + "on" + "</td>" +
            "<td class='tog'>" + "off" + "</td>" +
            "</tr>"
        )
        ;

    }

    this.superChargerTable.dataTable();

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
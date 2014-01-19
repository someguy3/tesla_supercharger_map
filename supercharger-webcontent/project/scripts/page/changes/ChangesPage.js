define([], function () {
    /**
     *
     * @constructor
     */
    var ChangesPage = function () {
        this.changesPage = $("#page-changes");
        this.changesTable = $("#changes-table");
    };

    ChangesPage.INIT_PROP = "page-initialized";

    ChangesPage.prototype.onPageShow = function () {
        if (!this.changesPage.data(ChangesPage.INIT_PROP)) {
            jQuery.get("changelog.txt", "", jQuery.proxy(this.handleTextBlock, this), "html");
        }
    };

    ChangesPage.prototype.handleTextBlock = function (textBlock) {
        var linesArray = textBlock.split("\n");
        this.handleLines(linesArray);
        this.changesPage.data(ChangesPage.INIT_PROP, true);
    };

    ChangesPage.prototype.handleLines = function (linesArray) {
        var v = this;
        jQuery.each(linesArray, function (index, line) {
            if (line.trim().length > 0) {
                var parts = line.trim().split("||");
                var cssClass = (/live:/.test(parts[1])) ? 'success' : '';
                v.changesTable.append("<tr class='" + cssClass + "'><td>" + parts[0] + "</td><td>" + parts[1] + "</td></tr>");
            }
        });
    };


    return ChangesPage;
});
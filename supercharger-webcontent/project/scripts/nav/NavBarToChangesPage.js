define(['jquery'], function ($) {
    /**
     *
     * @constructor
     */
    var NavBarToChangesPage = function () {
        this.changesPage = $("#page-changes");
        this.changesTable = $("<table id='changes-table' class='table table-striped table-condensed table-hover'></table>");
        this.changesPage.append(this.changesTable);
    }

    NavBarToChangesPage.prototype.load = function () {
        if (!this.changesPage.data('changes-tab-initialized')) {
            var v = this;
            jQuery.get("changelog.txt", "", function (textBlock) {
                v.handleTextBlock(textBlock);
                v.changesPage.data('changes-tab-initialized', true);
            }, "html");
        }
    };

    NavBarToChangesPage.prototype.handleTextBlock = function (textBlock) {
        var linesArray = textBlock.split("\n");
        this.handleLines(linesArray);
    }

    NavBarToChangesPage.prototype.handleLines = function (linesArray) {
        var v = this;
        jQuery.each(linesArray, function (index, line) {
            if (line.trim().length > 0) {
                var parts = line.trim().split("||");
                v.changesTable.append("<tr><td>" + parts[0] + "</td><td>" + parts[1] + "</td></tr>");
            }
        });
    }


    return NavBarToChangesPage;
});
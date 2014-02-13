/**
 * Just parses the raw superchargers.txt file and returns a map of keys to values without
 * any validation or transformation of values.
 *
 * -- Comments are ignored.
 * -- Blank lines are ignored.
 * -- Spaces are trimmed from keys and values.
 */
define(['text!siteload/superchargers.txt'], function (superchargerText) {

        var KEY_MIN_LENGTH_CHARS = 2;
        var KEY_NAME_RECORD_SEPARATOR = 'name';

        var SiteMapsRaw = [];

        var lineList = superchargerText.split("\n");
        var currentMap = null;

        function addRecord() {
            if (currentMap !== null) {
                SiteMapsRaw.push(currentMap);
            }
            currentMap = {};
        }

        function handleLine(index, line) {
            line = line.trim();
            if (line.charAt(0) === '#') {
                return;
            }
            if (line.length === 0) {
                return;
            }
            var sepIndex = line.indexOf(':');
            if (sepIndex <= KEY_MIN_LENGTH_CHARS) {
                throw new Error("invalid key in line=" + line);
            }
            var key = line.substr(0, sepIndex).trim();
            var value = line.substr(sepIndex + 1).trim();

            handleKeyValue(index, key, value);
        }

        function handleKeyValue(index, key, value) {
            if (key === KEY_NAME_RECORD_SEPARATOR) {
                addRecord();
            }
            currentMap[key] = value;
            if (index === lineList.length - 1) {
                addRecord();
            }
        }

        $.each(lineList, handleLine);
        return SiteMapsRaw;

    }

);
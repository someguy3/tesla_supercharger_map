/**
 * Takes the collection of raw sites and validates them then transforms them into supercharger objects.
 */
define(['siteload/SiteMapsRaw', 'siteload/FieldDefinitions', 'model/Supercharger', 'util/Objects', 'util/Asserts'],
    function (SiteMapsRaw, FieldDefinitions, Supercharger, Objects, Asserts) {

        var SiteTransform = [
        ];

        $.each(SiteMapsRaw, function (index, siteMap) {
            var supercharger = transformSite(siteMap);
            supercharger.id = index + 1;
            postConstructionValidation(supercharger);
            SiteTransform.push(supercharger);
        });

        function transformSite(siteMap) {

            // if the field is required, verify that it is in the map
            $.each(FieldDefinitions, function (fieldName, fieldDef) {
                assertFieldValuePresentIfRequired(fieldDef, siteMap);
            });

            var supercharger = new Supercharger();

            $.each(siteMap, function (key, value) {
                var fieldDef = assertKeyHasFieldDefinition(key, siteMap);
                fieldDef.parseFunciton(supercharger, key, value);
            });

            return supercharger;
        }

        function postConstructionValidation(supercharger) {
            Asserts.isFalse(supercharger.isStatusConstruction() && supercharger.hasOpenDate(), "construction site should not have open date:" + supercharger);
            Asserts.isFalse(supercharger.isStatusPlanned() && supercharger.hasOpenDate(), "planned site should not have open date:" + supercharger);
            Asserts.isFalse(supercharger.isOpen() && !supercharger.hasOpenDate(), "open site should have open date:" + supercharger);
        }

        function assertFieldValuePresentIfRequired(fieldDef, siteMap) {
            if (fieldDef.required) {
                var key = fieldDef.name;
                var value = siteMap[key];
                if (Objects.isNullOrUndef(value) || value.trim().length === 0) {
                    throw new Error("missing required field '" + key + "' in " + JSON.stringify(siteMap));
                }
            }
        }

        function assertKeyHasFieldDefinition(key, siteMap) {
            var fieldDef = FieldDefinitions[key];
            if (Objects.isNullOrUndef(fieldDef)) {
                throw new Error("unrecognized field '" + key + "' in " + JSON.stringify(siteMap));
            }
            return fieldDef;
        }


        return SiteTransform;

    }

);
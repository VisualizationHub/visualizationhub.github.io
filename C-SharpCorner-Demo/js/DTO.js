/**
 * Inspired from Dot Net Data Transfer Object Concept, Utility contains method which rename keys in existing object using plain Javascript code.
 */
var DTO = (function() {
    var isAllowKeyOverWrite = true;
    // This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
    // Reference from : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }

    /**
     * function accept array of object and based on new key it update returning array of object with updated keys
     * @param {*} collection   Array of object
     * @param {*}   newKeyPair New key pair for old and new key 
     * @param {*} overwrite Allow overwrite existing key or not
     */
    var mapTo = function(collection, newKeyPair, overwrite) {
        //TODO  Early exit check for invalid user input
        isAllowKeyOverWrite = overwrite !== undefined ? overwrite : isAllowKeyOverWrite;
        return collection.map(function(record) {
            // Clone new object to prevent modification of source object
            var item = Object.assign({}, record);
            for (var key in item) {
                // Restrict key as undefined while dynamic rename/inject new key in object
                // Restrict overwrite for existing key.

                if (newKeyPair[key]) {

                    var isKeyExist = newKeyPair[key] in item;
                    if (!isKeyExist) {
                        // If new key is not exist then not need to check isAllowKeyOverWrite flag
                        //Check new key is already exist or not
                        item[newKeyPair[key]] = item[key];
                        //itm["" + newKeyPair[key]] = itm[key];

                        //Once you injected key delete old key from object.
                        delete item[key];
                    } else if (isKeyExist && isAllowKeyOverWrite) {

                        // If new key is exist ,also check isAllowKeyOverWrite flag
                        item[newKeyPair[key]] = item[key];
                        //TODO Need to verify and modify below code if required.
                        delete item[key];
                    }
                }
            }
            // Deletion of old key code moved in above for loop
            // if (isKeyOverWrite) {
            //     for (var oldKey in newKeyPair) {

            //         delete itm["" + oldKey];
            //     }
            // }
            return item;
        });
    };
    return {
        mapTo
    };
})();
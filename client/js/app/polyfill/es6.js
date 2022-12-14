'use strict';

System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            if (!Array.prototype.includes) {
                console.log('Polyfill para Array.includes aplicado');
                Array.prototype.includes = function (element) {
                    return this.indexOf(element) != -1;
                };
            }
        }
    };
});
//# sourceMappingURL=es6.js.map
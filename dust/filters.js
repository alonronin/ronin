var dust = require('dustjs-linkedin');

dust.filters.st = function(value) {
    return value.stripTags();
};
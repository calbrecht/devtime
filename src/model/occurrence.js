var _  = require("lodash");

function Occurrence (values) {

    _.assign(this, _.defaults(values, {
        at: "",
        term: ""
    }));
}

module.exports = Occurrence;

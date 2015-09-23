var _    = require("lodash"),
    Base = require("./base");

function Occurrences (create, occurrences) {
    this.create = create;
    Base.call(this, occurrences);
}

Occurrences.prototype = _.create(Base.prototype, {
    'constructor': Occurrences
});

module.exports = Occurrences;

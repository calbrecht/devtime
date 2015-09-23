var _    = require("lodash"),
    Base = require("./base");

function Durations (create, durations) {
    this.create = create;
    Base.call(this, durations);
}

Durations.prototype = _.create(Base.prototype, {
    'constructor': Durations
});

module.exports = Durations;


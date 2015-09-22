var _       = require("lodash"),
    tc      = require("timezonecomplete/dist/timezonecomplete"),
    endless = new tc.DateTime("9999-09-09T09:09:09.999");

function Duration (values) {
    var start,
        stop;

    this.__defineGetter__("start", function () {
        return start;
    });
    this.__defineSetter__("start", function (value) {
        start = value instanceof tc.DateTime ? value : new tc.DateTime(value);
    });
    this.__defineGetter__("stop", function () {
        return stop;
    });
    this.__defineSetter__("stop", function (value) {
        stop = value instanceof tc.DateTime ? value : new tc.DateTime(value);
    });

    _.assign(this, _.defaultsDeep(values || {}, {
        start: tc.now(),
        stop: this.endless
    }));
}

Duration.prototype = {
    get endless() {
        return endless;
    },
    set endless(value) {
        throw new Error("Assignment not possible");
    }
};

Duration.prototype.intersects = function (duration) {
    return this.start < duration.stop && this.stop > duration.start;
};

Duration.prototype.intersection = function (duration) {
    if (this.intersects(duration)) {

        return new Duration({
            start: tc.max(this.start, duration.start),
            stop: tc.min(this.stop, duration.stop)
        });
    }

    return null;
};

module.exports = Duration;

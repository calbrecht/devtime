var _ = require("lodash");

function Task (values, occurrences, durations) {

    this.__defineGetter__("occurrences", function () {
        return occurrences;
    });
    this.__defineGetter__("durations", function () {
        return durations;
    });

    _.assign(this, _.defaults(values, {
        title: "",
        summary: ""
    }));
}

module.exports = Task;

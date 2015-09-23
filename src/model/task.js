var _ = require("lodash");

function Task (values, occurrences, durations) {

    _.assign(this, _.defaults(values, {
        title: "",
        summary: "",
        occurrences: occurrences,
        durations: durations
    }));
}

module.exports = Task;

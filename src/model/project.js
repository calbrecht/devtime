var _ = require("lodash");

function Project (values) {
    var title;

    this.__defineGetter__("title", function () {
        return title;
    });
    this.__defineSetter__("title", function (value) {
        title = value;
        this.id = _.kebabCase(title);
    });

    _.assign(this, _.defaultsDeep(values, {
        title: ""
    }));
}

module.exports = Project;

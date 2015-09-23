var _    = require("lodash"),
    Base = require("./base");

function Tasks (create, tasks) {
    this.create = create;
    Base.call(this, tasks);
}

Tasks.prototype = _.create(Base.prototype, {
    'constructor': Tasks
});

module.exports = Tasks;


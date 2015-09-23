var _    = require("lodash"),
    Base = require("./base");

function Projects (create, projects) {
    this.create = create;
    Base.call(this, projects);
}

Projects.prototype = _.create(Base.prototype, {
    'constructor': Projects
});

module.exports = Projects;

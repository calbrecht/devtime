var _ = require("lodash"),
    c = require("lodash/collection"),
    collection = [];

function Projects (create, projects) {
    _.forEach(projects, function (project) {
        collection.push(create(project));
    });
}

_.forIn(c, function(func, key) {
    Projects.prototype[key] = _.bind(func, null, collection);
});

module.exports = Projects;

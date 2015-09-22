var Project  = require("./model/project"),
    Projects = require("./collection/projects"),
    Duration = require("./model/duration");

exports.createProject = function createProject(values) {
    return new Project(values);
};

exports.createProjects = function createProjects(projects) {
    return new Projects(exports.createProject, projects);
};

exports.createDuration = function createDuration(dates) {
    return new Duration(dates);
};

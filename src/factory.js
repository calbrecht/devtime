var Project  = require("./model/project"),
    Projects = require("./collection/projects");

exports.createProject = function createProject(values) {
    return new Project(values);
};

exports.createProjects = function createProjects(projects) {
    return new Projects(exports.createProject, projects);
};

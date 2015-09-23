var Project     = require("./model/project"),
    Projects    = require("./collection/projects"),
    Occurrence  = require("./model/occurrence"),
    Occurrences = require("./collection/occurrences"),
    Duration    = require("./model/duration"),
    Durations   = require("./collection/durations"),
    Task        = require("./model/task"),
    Tasks       = require("./collection/tasks");

exports.createProject = function createProject(values) {
    return new Project(values);
};

exports.createProjects = function createProjects(values) {
    return new Projects(exports.createProject, values);
};

exports.createDuration = function createDuration(values) {
    return new Duration(values);
};

exports.createDurations = function createDurations(values) {
    return new Durations(exports.createDuration, values);
};

exports.createOccurrence = function createOccurrence(values) {
    return new Occurrence(values);
};

exports.createOccurrences = function createOccurrences(values) {
    return new Occurrences(exports.createOccurrence, values);
};

exports.createTask = function createTask(values, occurrences, durations) {
    return new Task(values, exports.createOccurrences(occurrences), exports.createDurations(durations));
};

exports.createTasks = function createTasks(values) {
    return new Tasks(exports.createTask, values);
};

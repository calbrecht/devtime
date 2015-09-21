var page = require('../page/today'),
    factory = require("../factory"),
    tabFolder = page.find("#today-projects").first(),
    i;

page.open();

var projects = factory.createProjects([
    {title: "MVS"},
    {title: "Mayflower"}
]);

projects.forEach(function (project) {
    tabFolder.addTab(project.id, project.title);
});

var mvsTasks = [];

for (i = 2000; i < 2025; i++) {
    mvsTasks.push({
        title: "MVS-" +i
    });
}

page.find("#today-tasks-mvs").first().set("refreshEnabled", true).insert(mvsTasks);

var mayflowerTickets = [];

for (i = 2000; i < 2025; i++) {
    mayflowerTickets.push({
        title: "Mayflower-" +i
    });
}

page.find("#today-tasks-mayflower").first().insert(mayflowerTickets);

tabris.create("Drawer").append(tabris.create("PageSelector"));

tabris.create("Action", {
    title: "Reload",
    placementPriority: "high"
}).on("select", function() {
    tabris.app.reload();
});

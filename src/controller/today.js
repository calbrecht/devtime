var page = require('../page/today'),
    tabFolder = page.find("#today-projects").first(),
    i;

page.open();

tabFolder.addTab("MVS");

var mvsTasks = [];

for (i = 2000; i < 2025; i++) {
    mvsTasks.push({
        title: "MVS-" +i
    });
}

page.find("#today-tasks-MVS").first().set("refreshEnabled", true).insert(mvsTasks);

tabFolder.addTab("Mayflower");

var mayflowerTickets = [];

for (i = 2000; i < 2025; i++) {
    mayflowerTickets.push({
        title: "Mayflower-" +i
    });
}

page.find("#today-tasks-Mayflower").first().insert(mayflowerTickets);

tabris.create("Drawer").append(tabris.create("PageSelector"));

tabris.create("Action", {
    title: "Reload",
    placementPriority: "high"
}).on("select", function() {
    tabris.app.reload();
});

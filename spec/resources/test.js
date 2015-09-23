var fs = require('fs'),
    flow = require('xml-flow'),
    inFile = fs.createReadStream('/opt/ws/devtime/spec/resources/activitystreams3.xml'),
    xmlStream = flow(inFile),
    factory = require("../../src/factory"),
    _ = require("lodash"),
    startTerms = ["started", "In Code Review"],
    tasks = factory.createTasks(),
    task;

xmlStream.on('tag:entry', function (entry) {
    if (entry.category && entry.category.term) {
        if (entry["activity:object"].title) {
            task = tasks.add({
                title: entry["activity:object"].title["$text"],
                summary: entry["activity:object"].summary["$text"]
            });
            task.occurrences.add({
                at: entry.updated,
                term: entry.category.term
            });
            //console.log(entry.id, entry.updated, entry.category.term, entry["activity:object"].title["$text"], entry["activity:object"].summary["$text"]);
        } else {
            //a comment entry
            //console.log(entry.id, entry.updated, entry.category.term, entry["activity:target"].title["$text"]);
        }
    } else {
        //console.log(entry.id, entry.updated, entry.title["$text"].replace(/<.*?>/g, ""));
    }
});


xmlStream.on('end', function () {

    tasks.forEach(function (task) {
        var duration = {};

        _.forEach(task.occurrences.sortBy("at"), function (occurrence) {

            if (_.contains(startTerms, occurrence.term)) {
                duration.start = occurrence.at;
            } else if (duration.start) {
                duration.stop = occurrence.at;
            }
            if (duration.start && duration.stop) {
                task.durations.add(duration);
                duration = {};
            }

        });

        if (duration.start && !duration.stop) {
            task.durations.add(duration);
        }

        task.durations.forEach(function (duration) {
            console.log(
                task.title,
                duration.start.format("dd/MM/yyyy HH.mm.ss"),
                duration.stop.format("dd/MM/yyyy HH.mm.ss"),
                duration.toHm()
            );
        });
    });
});

var style = require('../style'),
    page,
    tabFolder;

page = tabris.create("Page", {
    title: "Today",
    topLevel: true
});

tabris.registerWidget("Timer", {
    _type: "rwt.widgets.Composite",
    _supportsChildren: true,
    _properties: {
        title: {
            type: "string",
            default: "",
            access: {
                set: function(name, value, options) {
                    this._storeProperty(name, value, options);
                    this._title && this._title.set("text", value);
                }
            }
        },
        titleFont: {
            type: "string",
            default: style.font.default,
            access: {
                set: function(name, value, options) {
                    this._storeProperty(name, value, options);
                    this._title && this._title.set("font", value);
                }
            }
        },
        borderBottomWidth: {
            type: "natural",
            default: 0,
            access: {
                set: function(name, value, options) {
                    this._storeProperty(name, value, options);
                    this._ruler && this._ruler.set("layoutData", {left: 0, right: 0, bottom: 0, height: value});
                }
            }
        }
    },
    _create: function (properties) {
        var self = this;
        
        self.set("layoutData", {left: 0, top: 0, right: 0, height: 40});

        self.super("_create", properties);

        self._title = tabris.create("TextView", {
            class: "title",
            layoutData: {left: 15, right: 160},
            text: self.get("title"),
            font: self.get("titleFont"),
            maxLines: 1,
            centerY: 0
        }).appendTo(self);

        tabris.create("TextView", {
            class: "sum",
            layoutData: {right: 120, width: 40},
            text: "00:00",
            font: style.font.time,
            alignment: "right",
            centerY: 0
        }).appendTo(self);

        tabris.create("TextView", {
            class: "current",
            layoutData: {right: 70, width: 40},
            text: "00:00",
            font: style.font.time,
            alignment: "right",
            centerY: 0
        }).appendTo(self);

        tabris.create("Switch", {
            selection: true,
            layoutData: {right: 10},
            centerY: 0
        }).appendTo(self);

        self._ruler = tabris.create("Composite", {
            class: "ruler",
            layoutData: {left: 0, right: 0, bottom: 0, height: self.get("borderBottomWidth")},
            background: "#CCC"
        }).appendTo(self);

        return self;
    }
});

tabris.create("Timer", {
    class: "day",
    title: new Date().toLocaleDateString(),
    titleFont: style.font.title,
    borderBottomWidth: 1
}).appendTo(page);

tabFolder = tabris.create("TabFolder", {
    id: "today-projects",
    paging: true,
    tabBarLocation: "bottom",
    layoutData: {left: 0, top: 40, right: 0, bottom: -51}
}).appendTo(page);

tabFolder.addTab = function (id, title) {
    var tab = tabris.create("Tab", {
        id: "today-project-" + id,
        title: title
    }).appendTo(tabFolder);

    tabris.create("Timer", {
        class: "project",
        title: title,
        borderBottomWidth: 1
    }).appendTo(tab);

    tabris.create("CollectionView", {
        id: "today-tasks-" + id,
        layoutData: {left: 0, top: "prev()", right: 0, bottom: 0},
        itemHeight: 40,
        background: "rgba(0,0,0,0.02)",
        initializeCell: function(cell) {
            var timer = tabris.create("Timer", {
                class: "task"
            }).appendTo(cell);
            cell.on("change:item", function(widget, item) {
                timer.set("title", item.title);
            });
            cell.on("change:itemIndex", function(widget, itemIndex) {
                if (itemIndex % 2 == 1) {
                    widget.set("background", "rgba(0,0,0,0.02)");
                } else {
                    widget.set("background", "rgba(0,0,0,0)");
                }
            });
        }
    }).appendTo(tab);
};

module.exports = page;

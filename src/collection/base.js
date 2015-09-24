var _ = require("lodash"),
    c = require("lodash/collection");

function Base (values) {
    var collection = [];

    _.forIn(c, function(func, key) {
        this[key] = _.bind(func, this, collection);
    }, this);

    this.__defineGetter__("collection", function () {
        return collection;
    });

    this.push = function (value) {
        var item = this.create(value);
        collection.push(item);

        return item;
    };

    _.forEach(values, function (value) {
        this.push(value);
    }, this);
}

Base.prototype.add = function (value) {
    var item = this.findWhere(value);
    if (!item) {
        item = this.push(value);
    }

    return item;
};

module.exports = Base;

var _ = require("lodash"),
    c = require("lodash/collection");

function Base (values) {
    var collection = [];

    _.forIn(c, function(func, key) {
        this[key] = _.bind(this[key], this, collection);
    }, this);

    this.__defineGetter__("collection", function () {
        return collection;
    });

    this.push = function (value) {
        var item = this.create(value);
        collection.push(item);

        return item;
    };

    this.add = function (value) {
        var item = this.findWhere(value);
        if (!item) {
            item = this.push(value);
        }

        return item;
    };

    _.forEach(values, function (value) {
        this.push(value);
    }, this);
}

_.forIn(c, function(func, key) {
    Base.prototype[key] = _.bind(func, Base.prototype);
});

module.exports = Base;

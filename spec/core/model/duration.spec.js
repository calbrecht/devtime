describe("duration", function () {
    var Duration = require("../../../src/model/duration"),
        tc       = require("timezonecomplete/dist/timezonecomplete");

    it ("should have an endless date", function () {
        expect(Duration.prototype.endless instanceof tc.DateTime).toBeTruthy();
    });

    it ("should throw when trying to set endless", function () {
        var d          = new Duration(),
            setEndless = function () {
                d.endless = tc.now();
            };

        expect(setEndless).toThrow();
    });

    it ("should have a start value of now when created without params", function () {
        var d   = new Duration(),
            now = tc.now();

        expect(d.start.diff(now).seconds()).toBeLessThan(5);
    });

    it ("should have a stop value of endless when created without params", function () {
        var d   = new Duration();

        expect(d.stop).toEqual(d.endless);
    });

    it ("should be able to pass start when creating", function () {
        var start    = "2121-12-21",
            d        = new Duration({start: start}),
            expected = new tc.DateTime(start);

        expect(d.start).toEqual(expected);
    });

    it ("should be able to pass stop when creating", function () {
        var stop    = "2121-12-21",
            d        = new Duration({stop: stop}),
            expected = new tc.DateTime(stop);

        expect(d.stop).toEqual(expected);
    });

    describe("intersections", function () {
        var intersections = [
            {
                one: {start: "2000-01-10", stop: "2000-01-15"},
                two: {start: "2000-01-20", stop: "2000-01-25"},
                intersects: false,
                intersection: null
            }, {
                one: {start: "2000-01-10", stop: "2000-01-20"},
                two: {start: "2000-01-15", stop: "2000-01-25"},
                intersects: true,
                intersection: {start: "2000-01-15", stop: "2000-01-20"}
            }, {
                one: {start: "2000-01-10", stop: "2000-01-25"},
                two: {start: "2000-01-15", stop: "2000-01-20"},
                intersects: true,
                intersection: {start: "2000-01-15", stop: "2000-01-20"}
            }, {
                one: {start: "2000-01-10", stop: Duration.prototype.endless},
                two: {start: "2000-01-15", stop: "2000-01-20"},
                intersects: true,
                intersection: {start: "2000-01-15", stop: "2000-01-20"}
            }, {
                one: {start: "2000-01-10", stop: Duration.prototype.endless},
                two: {start: "2000-01-15", stop: Duration.prototype.endless},
                intersects: true,
                intersection: {start: "2000-01-15", stop: Duration.prototype.endless}
            }
        ];

        intersections.forEach(function (data, index) {
            var one = new Duration(data.one),
                two = new Duration(data.two),
                expected = null,
                format = function (date) {
                    return date.format("yyyy-MM-dd");
                },
                equalDuration = function (actual, expected) {
                    expect(format(actual.start)).toBe(format(expected.start));
                    expect(format(actual.stop)).toBe(format(expected.stop));
                };

            it("should check intersects in case " + index, function () {
                expect(one.intersects(two)).toBe(data.intersects);
            });

            it("should check intersects in reverse case " + index, function () {
                expect(two.intersects(one)).toBe(data.intersects);
            });

            if (data.intersects) {
                expected = new Duration(data.intersection);

                it("should return intersection in case " + index, function () {
                    equalDuration(one.intersection(two), expected);
                });

                it("should return intersection in reverse case " + index, function () {
                    equalDuration(two.intersection(one), expected);
                });
            } else {

                it("should return intersection in case " + index, function () {
                    expect(one.intersection(two)).toBeNull();
                });

                it("should return intersection in reverse case " + index, function () {
                    expect(two.intersection(one)).toBeNull();
                });
            }
        });
    });
});

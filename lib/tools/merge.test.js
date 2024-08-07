import mergeDeep from "./merge";
describe("Test getMode function", function () {
    var simpleObject = {
        str: "foo"
    };
    var objectWithArray = {
        arr: [1, 2]
    };
    var nestedObject = {
        obj: {
            foo: "foo"
        }
    };
    var nestedObjectWithArray = {
        obj: {
            arr: [1, 2]
        }
    };
    it("Merge two objects", function () {
        expect(mergeDeep(simpleObject, { str: "bar" })).toEqual({ str: "bar" });
    });
    it("Merge two objects with arrays", function () {
        expect(mergeDeep(objectWithArray, { arr: [3, 4] })).toEqual({ arr: [3, 4] });
    });
    it("Merge two objects with nested objects", function () {
        expect(mergeDeep(nestedObject, { obj: { bar: "bar" } })).toEqual({ obj: { foo: "foo", bar: "bar" } });
    });
    it("Merge three objects with nested objects", function () {
        expect(mergeDeep(nestedObjectWithArray, nestedObject, { obj: { arr: [3, 4] } })).toEqual({
            obj: {
                foo: "foo",
                arr: [3, 4]
            }
        });
    });
    it("Don't mutate target", function () {
        var target = {
            str: "foo"
        };
        expect(mergeDeep(target, { str: "bar" })).not.toBe(target);
    });
    it("Skip undefined sources", function () {
        expect(mergeDeep(simpleObject, undefined)).toBe(simpleObject);
    });
    it("Skip undefined sources dfs", function () {
        var simpleArray = [1, 2];
        expect(mergeDeep(simpleArray, [3, 4])).toEqual(simpleArray);
    });
});
//# sourceMappingURL=merge.test.js.map
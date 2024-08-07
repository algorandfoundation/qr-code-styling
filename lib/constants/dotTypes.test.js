import dotTypes from "./dotTypes";
describe("Dot Types", function () {
    it("The export of the module should be an object", function () {
        expect(typeof dotTypes).toBe("object");
    });
    it.each(Object.values(dotTypes))("Values should be strings", function (value) {
        expect(typeof value).toBe("string");
    });
});
//# sourceMappingURL=dotTypes.test.js.map
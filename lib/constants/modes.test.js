import modes from "./modes";
describe("Modes", function () {
    it("The export of the module should be an object", function () {
        expect(typeof modes).toBe("object");
    });
    it.each(Object.values(modes))("Values should be strings", function (value) {
        expect(typeof value).toBe("string");
    });
});
//# sourceMappingURL=modes.test.js.map
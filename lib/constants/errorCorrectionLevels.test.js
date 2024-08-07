import errorCorrectionLevels from "./errorCorrectionLevels";
describe("Error Correction Levels", function () {
    it("The export of the module should be an object", function () {
        expect(typeof errorCorrectionLevels).toBe("object");
    });
    it.each(Object.values(errorCorrectionLevels))("Values should be strings", function (value) {
        expect(typeof value).toBe("string");
    });
    it.each(Object.keys(errorCorrectionLevels))("A key of the object should be the same as a value", function (key) {
        expect(key).toBe(errorCorrectionLevels[key]);
    });
    it.each(Object.keys(errorCorrectionLevels))("Allowed only particular keys", function (key) {
        expect(["L", "M", "Q", "H"]).toContain(key);
    });
});
//# sourceMappingURL=errorCorrectionLevels.test.js.map
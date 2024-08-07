import errorCorrectionPercents from "./errorCorrectionPercents";
describe("Error Correction Percents", function () {
    it("The export of the module should be an object", function () {
        expect(typeof errorCorrectionPercents).toBe("object");
    });
    it.each(Object.values(errorCorrectionPercents))("Values should be numbers", function (value) {
        expect(typeof value).toBe("number");
    });
    it.each(Object.keys(errorCorrectionPercents))("Allowed only particular keys", function (key) {
        expect(["L", "M", "Q", "H"]).toContain(key);
    });
});
//# sourceMappingURL=errorCorrectionPercents.test.js.map
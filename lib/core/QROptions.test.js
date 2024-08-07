import QROptions from "./QROptions";
describe("Test default QROptions", function () {
    it("The export of the module should be an object", function () {
        expect(typeof QROptions).toBe("object");
    });
    describe("Test the content of options", function () {
        var optionsKeys = [
            "width",
            "height",
            "data",
            "margin",
            "qrOptions",
            "imageOptions",
            "dotsOptions",
            "backgroundOptions"
        ];
        it.each(optionsKeys)("The options should contain particular keys", function (key) {
            expect(Object.keys(QROptions)).toContain(key);
        });
    });
});
//# sourceMappingURL=QROptions.test.js.map
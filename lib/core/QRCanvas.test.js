var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import fs from "fs";
import path from "path";
import qrcode from "qrcode-generator";
import QRCanvas from "./QRCanvas";
import modes from "../constants/modes";
import mergeDeep from "../tools/merge";
import defaultQRCodeStylingOptions from "./QROptions";
describe("Test QRCanvas class", function () {
    var qr;
    var defaultOptions = mergeDeep(defaultQRCodeStylingOptions, {
        width: 100,
        height: 100,
        data: "TEST",
        qrOptions: {
            mode: modes.alphanumeric
        }
    });
    var defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mNk+M+AARiHsiAAcCIKAYwFoQ8AAAAASUVORK5CYII=";
    beforeAll(function () {
        qr = qrcode(defaultOptions.qrOptions.typeNumber, defaultOptions.qrOptions.errorCorrectionLevel);
        qr.addData(defaultOptions.data, defaultOptions.qrOptions.mode);
        qr.make();
    });
    it("Should draw simple qr code", function () {
        var expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, "../assets/test/simple_qr.png"), "base64");
        var canvas = new QRCanvas(defaultOptions);
        canvas.drawQR(qr);
        expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
    });
    it("Should draw a qr code with image", function (done) {
        var expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, "../assets/test/simple_qr_with_image.png"), "base64");
        var canvas = new QRCanvas(__assign(__assign({}, defaultOptions), { image: defaultImage }));
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(function () {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it("Should draw a qr code with image margin", function (done) {
        var expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, "../assets/test/simple_qr_with_image_margin.png"), "base64");
        var canvas = new QRCanvas(__assign(__assign({}, defaultOptions), { image: defaultImage, imageOptions: __assign(__assign({}, defaultOptions.imageOptions), { margin: 2 }) }));
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(function () {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it("Should draw a qr code with image without dots hiding", function (done) {
        var expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, "../assets/test/simple_qr_with_image.png"), "base64");
        var canvas = new QRCanvas(__assign(__assign({}, defaultOptions), { image: defaultImage, imageOptions: __assign(__assign({}, defaultOptions.imageOptions), { hideBackgroundDots: false }) }));
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(function () {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it("Should draw a qr code with margin around canvas", function () {
        var expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, "../assets/test/simple_qr_with_margin_canvas.png"), "base64");
        var canvas = new QRCanvas(__assign(__assign({}, defaultOptions), { margin: 20 }));
        canvas.drawQR(qr);
        expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
    });
});
//# sourceMappingURL=QRCanvas.test.js.map
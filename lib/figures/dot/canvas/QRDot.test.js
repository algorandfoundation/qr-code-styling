import QRDot from "./QRDot";
import fs from "fs";
import path from "path";
describe("Test QRDot class", function () {
    var canvasSize = 100;
    var canvas, canvasContext;
    beforeAll(function () {
        canvas = global.document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvasContext = canvas.getContext("2d");
    });
    beforeEach(function () {
        canvasContext.fillStyle = "#fff";
        canvasContext.fillRect(0, 0, canvasSize, canvasSize);
        canvasContext.fillStyle = "#000";
        canvasContext.beginPath();
    });
    afterEach(function () {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    });
    it("Should draw simple square dot", function () {
        var dotSize = 50;
        var imgFile = fs.readFileSync(path.resolve(__dirname, "../../../assets/test/simple_square_dot.png"), "base64");
        var dot = new QRDot({ context: canvasContext, type: "square" });
        dot.draw(dotSize / 2, dotSize / 2, dotSize, function () { return false; });
        canvasContext.fill("evenodd");
        expect(canvas.toDataURL()).toEqual(expect.stringContaining(imgFile));
    });
    it("Should draw simple dots", function () {
        var dotSize = 40;
        var imgFile = fs.readFileSync(path.resolve(__dirname, "../../../assets/test/simple_dots.png"), "base64");
        var dot = new QRDot({ context: canvasContext, type: "dots" });
        dot.draw(10, 30, dotSize, function () { return false; });
        dot.draw(50, 30, dotSize, function () { return false; });
        canvasContext.fill("evenodd");
        expect(canvas.toDataURL()).toEqual(expect.stringContaining(imgFile));
    });
    it("Should draw rounded dots", function () {
        var dotSize = 10;
        var matrix = [
            [1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [0, 1, 0, 1, 1],
            [0, 0, 1, 0, 0],
        ];
        var imgFile = fs.readFileSync(path.resolve(__dirname, "../../../assets/test/rounded_dots.png"), "base64");
        var dot = new QRDot({ context: canvasContext, type: "rounded" });
        var _loop_1 = function (y) {
            var _loop_2 = function (x) {
                if (!matrix[y][x]) {
                    return "continue";
                }
                dot.draw(25 + x * dotSize, 25 + y * dotSize, dotSize, function (xOffset, yOffset) {
                    if (matrix[y + yOffset]) {
                        return !!matrix[y + yOffset][x + xOffset];
                    }
                    else {
                        return false;
                    }
                });
            };
            for (var x = 0; x < matrix[y].length; x++) {
                _loop_2(x);
            }
        };
        for (var y = 0; y < matrix.length; y++) {
            _loop_1(y);
        }
        canvasContext.fill("evenodd");
        expect(canvas.toDataURL()).toEqual(expect.stringContaining(imgFile));
    });
});
//# sourceMappingURL=QRDot.test.js.map
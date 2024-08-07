var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import calculateImageSize from "../tools/calculateImageSize";
import errorCorrectionPercents from "../constants/errorCorrectionPercents";
import QRDot from "../figures/dot/canvas/QRDot";
import QRCornerSquare from "../figures/cornerSquare/canvas/QRCornerSquare";
import QRCornerDot from "../figures/cornerDot/canvas/QRCornerDot";
import gradientTypes from "../constants/gradientTypes";
var squareMask = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];
var dotMask = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var QRCanvas = /** @class */ (function () {
    //TODO don't pass all options to this class
    function QRCanvas(options) {
        var _a;
        if ((_a = options.nodeCanvas) === null || _a === void 0 ? void 0 : _a.createCanvas) {
            this._canvas = options.nodeCanvas.createCanvas(options.width, options.height);
        }
        else {
            this._canvas = document.createElement("canvas");
        }
        this._canvas.width = options.width;
        this._canvas.height = options.height;
        this._options = options;
    }
    Object.defineProperty(QRCanvas.prototype, "context", {
        get: function () {
            return this._canvas.getContext("2d");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QRCanvas.prototype, "width", {
        get: function () {
            return this._canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QRCanvas.prototype, "height", {
        get: function () {
            return this._canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    QRCanvas.prototype.getCanvas = function () {
        return this._canvas;
    };
    QRCanvas.prototype.clear = function () {
        var canvasContext = this.context;
        if (canvasContext) {
            canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    };
    QRCanvas.prototype.drawQR = function (qr) {
        return __awaiter(this, void 0, void 0, function () {
            var count, minSize, dotSize, drawImageSize, _a, imageOptions, qrOptions, coverLevel, maxHiddenDots;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        count = qr.getModuleCount();
                        minSize = Math.min(this._options.width, this._options.height) - this._options.margin * 2;
                        dotSize = Math.floor(minSize / count);
                        drawImageSize = {
                            hideXDots: 0,
                            hideYDots: 0,
                            width: 0,
                            height: 0
                        };
                        this._qr = qr;
                        if (!this._options.image) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadImage()];
                    case 1:
                        _b.sent();
                        if (!this._image)
                            return [2 /*return*/];
                        _a = this._options, imageOptions = _a.imageOptions, qrOptions = _a.qrOptions;
                        coverLevel = imageOptions.imageSize * errorCorrectionPercents[qrOptions.errorCorrectionLevel];
                        maxHiddenDots = Math.floor(coverLevel * count * count);
                        drawImageSize = calculateImageSize({
                            originalWidth: this._image.width,
                            originalHeight: this._image.height,
                            maxHiddenDots: maxHiddenDots,
                            maxHiddenAxisDots: count - 14,
                            dotSize: dotSize
                        });
                        _b.label = 2;
                    case 2:
                        this.clear();
                        this.drawBackground();
                        this.drawDots(function (i, j) {
                            var _a, _b, _c, _d, _e, _f;
                            if (_this._options.imageOptions.hideBackgroundDots) {
                                if (i >= (count - drawImageSize.hideXDots) / 2 &&
                                    i < (count + drawImageSize.hideXDots) / 2 &&
                                    j >= (count - drawImageSize.hideYDots) / 2 &&
                                    j < (count + drawImageSize.hideYDots) / 2) {
                                    return false;
                                }
                            }
                            if (((_a = squareMask[i]) === null || _a === void 0 ? void 0 : _a[j]) || ((_b = squareMask[i - count + 7]) === null || _b === void 0 ? void 0 : _b[j]) || ((_c = squareMask[i]) === null || _c === void 0 ? void 0 : _c[j - count + 7])) {
                                return false;
                            }
                            if (((_d = dotMask[i]) === null || _d === void 0 ? void 0 : _d[j]) || ((_e = dotMask[i - count + 7]) === null || _e === void 0 ? void 0 : _e[j]) || ((_f = dotMask[i]) === null || _f === void 0 ? void 0 : _f[j - count + 7])) {
                                return false;
                            }
                            return true;
                        });
                        this.drawCorners();
                        if (this._options.image) {
                            this.drawImage({ width: drawImageSize.width, height: drawImageSize.height, count: count, dotSize: dotSize });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QRCanvas.prototype.drawBackground = function () {
        var canvasContext = this.context;
        var options = this._options;
        if (canvasContext) {
            if (options.backgroundOptions.gradient) {
                var gradientOptions = options.backgroundOptions.gradient;
                var gradient_1 = this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: 0,
                    x: 0,
                    y: 0,
                    size: this._canvas.width > this._canvas.height ? this._canvas.width : this._canvas.height
                });
                gradientOptions.colorStops.forEach(function (_a) {
                    var offset = _a.offset, color = _a.color;
                    gradient_1.addColorStop(offset, color);
                });
                canvasContext.fillStyle = gradient_1;
            }
            else if (options.backgroundOptions.color) {
                canvasContext.fillStyle = options.backgroundOptions.color;
            }
            canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
    };
    QRCanvas.prototype.drawDots = function (filter) {
        var _this = this;
        if (!this._qr) {
            throw "QR code is not defined";
        }
        var canvasContext = this.context;
        if (!canvasContext) {
            throw "QR code is not defined";
        }
        var options = this._options;
        var count = this._qr.getModuleCount();
        if (count > options.width || count > options.height) {
            throw "The canvas is too small.";
        }
        var minSize = Math.min(options.width, options.height) - options.margin * 2;
        var dotSize = Math.floor(minSize / count);
        var xBeginning = Math.floor((options.width - count * dotSize) / 2);
        var yBeginning = Math.floor((options.height - count * dotSize) / 2);
        var dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
        canvasContext.beginPath();
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (filter && !filter(i, j)) {
                    return "continue";
                }
                if (!this_1._qr.isDark(i, j)) {
                    return "continue";
                }
                dot.draw(xBeginning + i * dotSize, yBeginning + j * dotSize, dotSize, function (xOffset, yOffset) {
                    if (i + xOffset < 0 || j + yOffset < 0 || i + xOffset >= count || j + yOffset >= count)
                        return false;
                    if (filter && !filter(i + xOffset, j + yOffset))
                        return false;
                    return !!_this._qr && _this._qr.isDark(i + xOffset, j + yOffset);
                });
            };
            for (var j = 0; j < count; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
        if (options.dotsOptions.gradient) {
            var gradientOptions = options.dotsOptions.gradient;
            var gradient_2 = this._createGradient({
                context: canvasContext,
                options: gradientOptions,
                additionalRotation: 0,
                x: xBeginning,
                y: yBeginning,
                size: count * dotSize
            });
            gradientOptions.colorStops.forEach(function (_a) {
                var offset = _a.offset, color = _a.color;
                gradient_2.addColorStop(offset, color);
            });
            canvasContext.fillStyle = canvasContext.strokeStyle = gradient_2;
        }
        else if (options.dotsOptions.color) {
            canvasContext.fillStyle = canvasContext.strokeStyle = options.dotsOptions.color;
        }
        canvasContext.fill("evenodd");
    };
    QRCanvas.prototype.drawCorners = function (filter) {
        var _this = this;
        if (!this._qr) {
            throw "QR code is not defined";
        }
        var canvasContext = this.context;
        if (!canvasContext) {
            throw "QR code is not defined";
        }
        var options = this._options;
        var count = this._qr.getModuleCount();
        var minSize = Math.min(options.width, options.height) - options.margin * 2;
        var dotSize = Math.floor(minSize / count);
        var cornersSquareSize = dotSize * 7;
        var cornersDotSize = dotSize * 3;
        var xBeginning = Math.floor((options.width - count * dotSize) / 2);
        var yBeginning = Math.floor((options.height - count * dotSize) / 2);
        [
            [0, 0, 0],
            [1, 0, Math.PI / 2],
            [0, 1, -Math.PI / 2]
        ].forEach(function (_a) {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var column = _a[0], row = _a[1], rotation = _a[2];
            if (filter && !filter(column, row)) {
                return;
            }
            var x = xBeginning + column * dotSize * (count - 7);
            var y = yBeginning + row * dotSize * (count - 7);
            if ((_b = options.cornersSquareOptions) === null || _b === void 0 ? void 0 : _b.type) {
                var cornersSquare = new QRCornerSquare({ context: canvasContext, type: (_c = options.cornersSquareOptions) === null || _c === void 0 ? void 0 : _c.type });
                canvasContext.beginPath();
                cornersSquare.draw(x, y, cornersSquareSize, rotation);
            }
            else {
                var dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
                canvasContext.beginPath();
                var _loop_3 = function (i) {
                    var _loop_5 = function (j) {
                        if (!((_d = squareMask[i]) === null || _d === void 0 ? void 0 : _d[j])) {
                            return "continue";
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, function (xOffset, yOffset) { var _a; return !!((_a = squareMask[i + xOffset]) === null || _a === void 0 ? void 0 : _a[j + yOffset]); });
                    };
                    for (var j = 0; j < squareMask[i].length; j++) {
                        _loop_5(j);
                    }
                };
                for (var i = 0; i < squareMask.length; i++) {
                    _loop_3(i);
                }
            }
            if ((_e = options.cornersSquareOptions) === null || _e === void 0 ? void 0 : _e.gradient) {
                var gradientOptions = options.cornersSquareOptions.gradient;
                var gradient_3 = _this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: rotation,
                    x: x,
                    y: y,
                    size: cornersSquareSize
                });
                gradientOptions.colorStops.forEach(function (_a) {
                    var offset = _a.offset, color = _a.color;
                    gradient_3.addColorStop(offset, color);
                });
                canvasContext.fillStyle = canvasContext.strokeStyle = gradient_3;
            }
            else if ((_f = options.cornersSquareOptions) === null || _f === void 0 ? void 0 : _f.color) {
                canvasContext.fillStyle = canvasContext.strokeStyle = options.cornersSquareOptions.color;
            }
            canvasContext.fill("evenodd");
            if ((_g = options.cornersDotOptions) === null || _g === void 0 ? void 0 : _g.type) {
                var cornersDot = new QRCornerDot({ context: canvasContext, type: (_h = options.cornersDotOptions) === null || _h === void 0 ? void 0 : _h.type });
                canvasContext.beginPath();
                cornersDot.draw(x + dotSize * 2, y + dotSize * 2, cornersDotSize, rotation);
            }
            else {
                var dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
                canvasContext.beginPath();
                var _loop_4 = function (i) {
                    var _loop_6 = function (j) {
                        if (!((_j = dotMask[i]) === null || _j === void 0 ? void 0 : _j[j])) {
                            return "continue";
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, function (xOffset, yOffset) { var _a; return !!((_a = dotMask[i + xOffset]) === null || _a === void 0 ? void 0 : _a[j + yOffset]); });
                    };
                    for (var j = 0; j < dotMask[i].length; j++) {
                        _loop_6(j);
                    }
                };
                for (var i = 0; i < dotMask.length; i++) {
                    _loop_4(i);
                }
            }
            if ((_k = options.cornersDotOptions) === null || _k === void 0 ? void 0 : _k.gradient) {
                var gradientOptions = options.cornersDotOptions.gradient;
                var gradient_4 = _this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: rotation,
                    x: x + dotSize * 2,
                    y: y + dotSize * 2,
                    size: cornersDotSize
                });
                gradientOptions.colorStops.forEach(function (_a) {
                    var offset = _a.offset, color = _a.color;
                    gradient_4.addColorStop(offset, color);
                });
                canvasContext.fillStyle = canvasContext.strokeStyle = gradient_4;
            }
            else if ((_l = options.cornersDotOptions) === null || _l === void 0 ? void 0 : _l.color) {
                canvasContext.fillStyle = canvasContext.strokeStyle = options.cornersDotOptions.color;
            }
            canvasContext.fill("evenodd");
        });
    };
    QRCanvas.prototype.loadImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            var options = _this._options;
            if (!options.image) {
                return reject("Image is not defined");
            }
            if ((_a = options.nodeCanvas) === null || _a === void 0 ? void 0 : _a.loadImage) {
                options.nodeCanvas
                    .loadImage(options.image)
                    .then(function (image) {
                    var _a;
                    // fix blurry svg
                    if (/(\.svg$)|(^data:image\/svg)/.test((_a = options.image) !== null && _a !== void 0 ? _a : "")) {
                        image.width = _this._options.width;
                        image.height = _this._options.height;
                    }
                    _this._image = image;
                    resolve();
                })
                    .catch(reject);
            }
            else {
                var image = new Image();
                if (typeof options.imageOptions.crossOrigin === "string") {
                    image.crossOrigin = options.imageOptions.crossOrigin;
                }
                _this._image = image;
                image.onload = function () {
                    resolve();
                };
                image.src = options.image;
            }
        });
    };
    QRCanvas.prototype.drawImage = function (_a) {
        var width = _a.width, height = _a.height, count = _a.count, dotSize = _a.dotSize;
        var canvasContext = this.context;
        if (!canvasContext) {
            throw "canvasContext is not defined";
        }
        if (!this._image) {
            throw "image is not defined";
        }
        var options = this._options;
        var xBeginning = Math.floor((options.width - count * dotSize) / 2);
        var yBeginning = Math.floor((options.height - count * dotSize) / 2);
        var dx = xBeginning + options.imageOptions.margin + (count * dotSize - width) / 2;
        var dy = yBeginning + options.imageOptions.margin + (count * dotSize - height) / 2;
        var dw = width - options.imageOptions.margin * 2;
        var dh = height - options.imageOptions.margin * 2;
        canvasContext.drawImage(this._image, dx, dy, dw < 0 ? 0 : dw, dh < 0 ? 0 : dh);
    };
    QRCanvas.prototype._createGradient = function (_a) {
        var context = _a.context, options = _a.options, additionalRotation = _a.additionalRotation, x = _a.x, y = _a.y, size = _a.size;
        var gradient;
        if (options.type === gradientTypes.radial) {
            gradient = context.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2);
        }
        else {
            var rotation = ((options.rotation || 0) + additionalRotation) % (2 * Math.PI);
            var positiveRotation = (rotation + 2 * Math.PI) % (2 * Math.PI);
            var x0 = x + size / 2;
            var y0 = y + size / 2;
            var x1 = x + size / 2;
            var y1 = y + size / 2;
            if ((positiveRotation >= 0 && positiveRotation <= 0.25 * Math.PI) ||
                (positiveRotation > 1.75 * Math.PI && positiveRotation <= 2 * Math.PI)) {
                x0 = x0 - size / 2;
                y0 = y0 - (size / 2) * Math.tan(rotation);
                x1 = x1 + size / 2;
                y1 = y1 + (size / 2) * Math.tan(rotation);
            }
            else if (positiveRotation > 0.25 * Math.PI && positiveRotation <= 0.75 * Math.PI) {
                y0 = y0 - size / 2;
                x0 = x0 - size / 2 / Math.tan(rotation);
                y1 = y1 + size / 2;
                x1 = x1 + size / 2 / Math.tan(rotation);
            }
            else if (positiveRotation > 0.75 * Math.PI && positiveRotation <= 1.25 * Math.PI) {
                x0 = x0 + size / 2;
                y0 = y0 + (size / 2) * Math.tan(rotation);
                x1 = x1 - size / 2;
                y1 = y1 - (size / 2) * Math.tan(rotation);
            }
            else if (positiveRotation > 1.25 * Math.PI && positiveRotation <= 1.75 * Math.PI) {
                y0 = y0 + size / 2;
                x0 = x0 + size / 2 / Math.tan(rotation);
                y1 = y1 - size / 2;
                x1 = x1 - size / 2 / Math.tan(rotation);
            }
            gradient = context.createLinearGradient(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1));
        }
        return gradient;
    };
    return QRCanvas;
}());
export default QRCanvas;
//# sourceMappingURL=QRCanvas.js.map
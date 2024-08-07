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
import QRDot from "../figures/dot/svg/QRDot";
import QRCornerSquare from "../figures/cornerSquare/svg/QRCornerSquare";
import QRCornerDot from "../figures/cornerDot/svg/QRCornerDot";
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
var QRSVG = /** @class */ (function () {
    //TODO don't pass all options to this class
    function QRSVG(options) {
        var _a;
        if (options.jsdom) {
            this._window = new options.jsdom("", { resources: "usable" }).window;
        }
        else {
            this._window = window;
        }
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._element.setAttribute("width", String(options.width));
        this._element.setAttribute("height", String(options.height));
        this._defs = this._window.document.createElementNS("http://www.w3.org/2000/svg", "defs");
        this._element.appendChild(this._defs);
        if (options.imageOptions.saveAsBlob) {
            if ((_a = options.nodeCanvas) === null || _a === void 0 ? void 0 : _a.createCanvas) {
                this._canvas = options.nodeCanvas.createCanvas(options.width, options.height);
            }
            else {
                this._canvas = document.createElement("canvas");
            }
            this._canvas.width = options.width;
            this._canvas.height = options.height;
        }
        this._imageUri = options.image;
        this._options = options;
    }
    Object.defineProperty(QRSVG.prototype, "width", {
        get: function () {
            return this._options.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QRSVG.prototype, "height", {
        get: function () {
            return this._options.height;
        },
        enumerable: false,
        configurable: true
    });
    QRSVG.prototype.getElement = function () {
        return this._element;
    };
    QRSVG.prototype.clear = function () {
        var _a;
        var oldElement = this._element;
        this._element = oldElement.cloneNode(false);
        (_a = oldElement === null || oldElement === void 0 ? void 0 : oldElement.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(this._element, oldElement);
        this._defs = this._window.document.createElementNS("http://www.w3.org/2000/svg", "defs");
        this._element.appendChild(this._defs);
    };
    QRSVG.prototype.drawQR = function (qr) {
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
                        //We need it to get image size
                        return [4 /*yield*/, this.loadImage()];
                    case 1:
                        //We need it to get image size
                        _b.sent();
                        if (!this._image)
                            return [2 /*return*/];
                        this.imageToBlob();
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
    QRSVG.prototype.drawBackground = function () {
        var _a, _b;
        var element = this._element;
        var options = this._options;
        if (element) {
            var gradientOptions = (_a = options.backgroundOptions) === null || _a === void 0 ? void 0 : _a.gradient;
            var color = (_b = options.backgroundOptions) === null || _b === void 0 ? void 0 : _b.color;
            if (gradientOptions || color) {
                this._createColor({
                    options: gradientOptions,
                    color: color,
                    additionalRotation: 0,
                    x: 0,
                    y: 0,
                    height: options.height,
                    width: options.width,
                    name: "background-color"
                });
            }
        }
    };
    QRSVG.prototype.drawDots = function (filter) {
        var _this = this;
        var _a, _b;
        if (!this._qr) {
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
        var dot = new QRDot({
            svg: this._element,
            type: options.dotsOptions.type,
            window: this._window
        });
        this._dotsClipPath = this._window.document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        this._dotsClipPath.setAttribute("id", "clip-path-dot-color");
        this._defs.appendChild(this._dotsClipPath);
        this._createColor({
            options: (_a = options.dotsOptions) === null || _a === void 0 ? void 0 : _a.gradient,
            color: options.dotsOptions.color,
            additionalRotation: 0,
            x: xBeginning,
            y: yBeginning,
            height: count * dotSize,
            width: count * dotSize,
            name: "dot-color"
        });
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (filter && !filter(i, j)) {
                    return "continue";
                }
                if (!((_b = this_1._qr) === null || _b === void 0 ? void 0 : _b.isDark(i, j))) {
                    return "continue";
                }
                dot.draw(xBeginning + i * dotSize, yBeginning + j * dotSize, dotSize, function (xOffset, yOffset) {
                    if (i + xOffset < 0 || j + yOffset < 0 || i + xOffset >= count || j + yOffset >= count)
                        return false;
                    if (filter && !filter(i + xOffset, j + yOffset))
                        return false;
                    return !!_this._qr && _this._qr.isDark(i + xOffset, j + yOffset);
                });
                if (dot._element && this_1._dotsClipPath) {
                    this_1._dotsClipPath.appendChild(dot._element);
                }
            };
            for (var j = 0; j < count; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
    };
    QRSVG.prototype.drawCorners = function () {
        var _this = this;
        if (!this._qr) {
            throw "QR code is not defined";
        }
        var element = this._element;
        var options = this._options;
        if (!element) {
            throw "Element code is not defined";
        }
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
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            var column = _a[0], row = _a[1], rotation = _a[2];
            var x = xBeginning + column * dotSize * (count - 7);
            var y = yBeginning + row * dotSize * (count - 7);
            var cornersSquareClipPath = _this._dotsClipPath;
            var cornersDotClipPath = _this._dotsClipPath;
            if (((_b = options.cornersSquareOptions) === null || _b === void 0 ? void 0 : _b.gradient) || ((_c = options.cornersSquareOptions) === null || _c === void 0 ? void 0 : _c.color)) {
                cornersSquareClipPath = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                cornersSquareClipPath.setAttribute("id", "clip-path-corners-square-color-" + column + "-" + row);
                _this._defs.appendChild(cornersSquareClipPath);
                _this._cornersSquareClipPath = _this._cornersDotClipPath = cornersDotClipPath = cornersSquareClipPath;
                _this._createColor({
                    options: (_d = options.cornersSquareOptions) === null || _d === void 0 ? void 0 : _d.gradient,
                    color: (_e = options.cornersSquareOptions) === null || _e === void 0 ? void 0 : _e.color,
                    additionalRotation: rotation,
                    x: x,
                    y: y,
                    height: cornersSquareSize,
                    width: cornersSquareSize,
                    name: "corners-square-color-" + column + "-" + row
                });
            }
            if ((_f = options.cornersSquareOptions) === null || _f === void 0 ? void 0 : _f.type) {
                var cornersSquare = new QRCornerSquare({
                    svg: _this._element,
                    type: options.cornersSquareOptions.type,
                    window: _this._window
                });
                cornersSquare.draw(x, y, cornersSquareSize, rotation);
                if (cornersSquare._element && cornersSquareClipPath) {
                    cornersSquareClipPath.appendChild(cornersSquare._element);
                }
            }
            else {
                var dot = new QRDot({
                    svg: _this._element,
                    type: options.dotsOptions.type,
                    window: _this._window
                });
                var _loop_3 = function (i) {
                    var _loop_5 = function (j) {
                        if (!((_g = squareMask[i]) === null || _g === void 0 ? void 0 : _g[j])) {
                            return "continue";
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, function (xOffset, yOffset) { var _a; return !!((_a = squareMask[i + xOffset]) === null || _a === void 0 ? void 0 : _a[j + yOffset]); });
                        if (dot._element && cornersSquareClipPath) {
                            cornersSquareClipPath.appendChild(dot._element);
                        }
                    };
                    for (var j = 0; j < squareMask[i].length; j++) {
                        _loop_5(j);
                    }
                };
                for (var i = 0; i < squareMask.length; i++) {
                    _loop_3(i);
                }
            }
            if (((_h = options.cornersDotOptions) === null || _h === void 0 ? void 0 : _h.gradient) || ((_j = options.cornersDotOptions) === null || _j === void 0 ? void 0 : _j.color)) {
                cornersDotClipPath = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                cornersDotClipPath.setAttribute("id", "clip-path-corners-dot-color-" + column + "-" + row);
                _this._defs.appendChild(cornersDotClipPath);
                _this._cornersDotClipPath = cornersDotClipPath;
                _this._createColor({
                    options: (_k = options.cornersDotOptions) === null || _k === void 0 ? void 0 : _k.gradient,
                    color: (_l = options.cornersDotOptions) === null || _l === void 0 ? void 0 : _l.color,
                    additionalRotation: rotation,
                    x: x + dotSize * 2,
                    y: y + dotSize * 2,
                    height: cornersDotSize,
                    width: cornersDotSize,
                    name: "corners-dot-color-" + column + "-" + row
                });
            }
            if ((_m = options.cornersDotOptions) === null || _m === void 0 ? void 0 : _m.type) {
                var cornersDot = new QRCornerDot({
                    svg: _this._element,
                    type: options.cornersDotOptions.type,
                    window: _this._window
                });
                cornersDot.draw(x + dotSize * 2, y + dotSize * 2, cornersDotSize, rotation);
                if (cornersDot._element && cornersDotClipPath) {
                    cornersDotClipPath.appendChild(cornersDot._element);
                }
            }
            else {
                var dot = new QRDot({
                    svg: _this._element,
                    type: options.dotsOptions.type,
                    window: _this._window
                });
                var _loop_4 = function (i) {
                    var _loop_6 = function (j) {
                        if (!((_o = dotMask[i]) === null || _o === void 0 ? void 0 : _o[j])) {
                            return "continue";
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, function (xOffset, yOffset) { var _a; return !!((_a = dotMask[i + xOffset]) === null || _a === void 0 ? void 0 : _a[j + yOffset]); });
                        if (dot._element && cornersDotClipPath) {
                            cornersDotClipPath.appendChild(dot._element);
                        }
                    };
                    for (var j = 0; j < dotMask[i].length; j++) {
                        _loop_6(j);
                    }
                };
                for (var i = 0; i < dotMask.length; i++) {
                    _loop_4(i);
                }
            }
        });
    };
    QRSVG.prototype.imageToBlob = function () {
        var _a;
        if (!this._image)
            return;
        // fix blurry svg
        if (/(\.svg$)|(^data:image\/svg)/.test((_a = this._options.image) !== null && _a !== void 0 ? _a : "")) {
            this._image.width = this._options.width;
            this._image.height = this._options.height;
        }
        if (this._options.imageOptions.saveAsBlob && this._canvas) {
            var ctx = this._canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height);
                this._imageUri = this._canvas.toDataURL("image/png");
                console.log(this._imageUri);
            }
        }
    };
    QRSVG.prototype.loadImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            var options = _this._options;
            if (((_a = options.nodeCanvas) === null || _a === void 0 ? void 0 : _a.loadImage) && options.image) {
                options.nodeCanvas
                    .loadImage(options.image)
                    .then(function (image) {
                    _this._image = image;
                    resolve();
                })
                    .catch(reject);
                return;
            }
            var image = new _this._window.Image();
            if (!options.image) {
                return reject("Image is not defined");
            }
            if (typeof options.imageOptions.crossOrigin === "string") {
                image.crossOrigin = options.imageOptions.crossOrigin;
            }
            _this._image = image;
            image.onload = function () {
                resolve();
            };
            image.src = options.image;
        });
    };
    QRSVG.prototype.drawImage = function (_a) {
        var width = _a.width, height = _a.height, count = _a.count, dotSize = _a.dotSize;
        var options = this._options;
        var xBeginning = Math.floor((options.width - count * dotSize) / 2);
        var yBeginning = Math.floor((options.height - count * dotSize) / 2);
        var dx = xBeginning + options.imageOptions.margin + (count * dotSize - width) / 2;
        var dy = yBeginning + options.imageOptions.margin + (count * dotSize - height) / 2;
        var dw = width - options.imageOptions.margin * 2;
        var dh = height - options.imageOptions.margin * 2;
        var image = this._window.document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttribute("href", this._imageUri || "");
        image.setAttribute("x", String(dx));
        image.setAttribute("y", String(dy));
        image.setAttribute("width", dw + "px");
        image.setAttribute("height", dh + "px");
        this._element.appendChild(image);
    };
    QRSVG.prototype._createColor = function (_a) {
        var _this = this;
        var options = _a.options, color = _a.color, additionalRotation = _a.additionalRotation, x = _a.x, y = _a.y, height = _a.height, width = _a.width, name = _a.name;
        var size = width > height ? width : height;
        var rect = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("height", String(height));
        rect.setAttribute("width", String(width));
        rect.setAttribute("clip-path", "url('#clip-path-" + name + "')");
        if (options) {
            var gradient_1;
            if (options.type === gradientTypes.radial) {
                gradient_1 = this._window.document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
                gradient_1.setAttribute("id", name);
                gradient_1.setAttribute("gradientUnits", "userSpaceOnUse");
                gradient_1.setAttribute("fx", String(x + width / 2));
                gradient_1.setAttribute("fy", String(y + height / 2));
                gradient_1.setAttribute("cx", String(x + width / 2));
                gradient_1.setAttribute("cy", String(y + height / 2));
                gradient_1.setAttribute("r", String(size / 2));
            }
            else {
                var rotation = ((options.rotation || 0) + additionalRotation) % (2 * Math.PI);
                var positiveRotation = (rotation + 2 * Math.PI) % (2 * Math.PI);
                var x0 = x + width / 2;
                var y0 = y + height / 2;
                var x1 = x + width / 2;
                var y1 = y + height / 2;
                if ((positiveRotation >= 0 && positiveRotation <= 0.25 * Math.PI) ||
                    (positiveRotation > 1.75 * Math.PI && positiveRotation <= 2 * Math.PI)) {
                    x0 = x0 - width / 2;
                    y0 = y0 - (height / 2) * Math.tan(rotation);
                    x1 = x1 + width / 2;
                    y1 = y1 + (height / 2) * Math.tan(rotation);
                }
                else if (positiveRotation > 0.25 * Math.PI && positiveRotation <= 0.75 * Math.PI) {
                    y0 = y0 - height / 2;
                    x0 = x0 - width / 2 / Math.tan(rotation);
                    y1 = y1 + height / 2;
                    x1 = x1 + width / 2 / Math.tan(rotation);
                }
                else if (positiveRotation > 0.75 * Math.PI && positiveRotation <= 1.25 * Math.PI) {
                    x0 = x0 + width / 2;
                    y0 = y0 + (height / 2) * Math.tan(rotation);
                    x1 = x1 - width / 2;
                    y1 = y1 - (height / 2) * Math.tan(rotation);
                }
                else if (positiveRotation > 1.25 * Math.PI && positiveRotation <= 1.75 * Math.PI) {
                    y0 = y0 + height / 2;
                    x0 = x0 + width / 2 / Math.tan(rotation);
                    y1 = y1 - height / 2;
                    x1 = x1 - width / 2 / Math.tan(rotation);
                }
                gradient_1 = this._window.document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                gradient_1.setAttribute("id", name);
                gradient_1.setAttribute("gradientUnits", "userSpaceOnUse");
                gradient_1.setAttribute("x1", String(Math.round(x0)));
                gradient_1.setAttribute("y1", String(Math.round(y0)));
                gradient_1.setAttribute("x2", String(Math.round(x1)));
                gradient_1.setAttribute("y2", String(Math.round(y1)));
            }
            options.colorStops.forEach(function (_a) {
                var offset = _a.offset, color = _a.color;
                var stop = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "stop");
                stop.setAttribute("offset", 100 * offset + "%");
                stop.setAttribute("stop-color", color);
                gradient_1.appendChild(stop);
            });
            rect.setAttribute("fill", "url('#" + name + "')");
            this._defs.appendChild(gradient_1);
        }
        else if (color) {
            rect.setAttribute("fill", color);
        }
        this._element.appendChild(rect);
    };
    return QRSVG;
}());
export default QRSVG;
//# sourceMappingURL=QRSVG.js.map
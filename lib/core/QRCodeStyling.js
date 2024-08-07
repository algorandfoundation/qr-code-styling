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
import getMode from "../tools/getMode";
import mergeDeep from "../tools/merge";
import downloadURI from "../tools/downloadURI";
import QRCanvas from "./QRCanvas";
import QRSVG from "./QRSVG";
import drawTypes from "../constants/drawTypes";
import defaultOptions from "./QROptions";
import sanitizeOptions from "../tools/sanitizeOptions";
import qrcode from "qrcode-generator";
var QRCodeStyling = /** @class */ (function () {
    function QRCodeStyling(options) {
        this._options = options ? sanitizeOptions(mergeDeep(defaultOptions, options)) : defaultOptions;
        this.update();
    }
    QRCodeStyling._clearContainer = function (container) {
        if (container) {
            container.innerHTML = "";
        }
    };
    QRCodeStyling.prototype._getQRStylingElement = function (extension) {
        if (extension === void 0) { extension = "png"; }
        return __awaiter(this, void 0, void 0, function () {
            var promise, svg, promise, canvas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._qr)
                            throw "QR code is empty";
                        if (!(extension.toLowerCase() === "svg")) return [3 /*break*/, 2];
                        promise = void 0, svg = void 0;
                        if (this._svg && this._svgDrawingPromise) {
                            svg = this._svg;
                            promise = this._svgDrawingPromise;
                        }
                        else {
                            svg = new QRSVG(this._options);
                            promise = svg.drawQR(this._qr);
                        }
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, svg];
                    case 2:
                        promise = void 0, canvas = void 0;
                        if (this._canvas && this._canvasDrawingPromise) {
                            canvas = this._canvas;
                            promise = this._canvasDrawingPromise;
                        }
                        else {
                            canvas = new QRCanvas(this._options);
                            promise = canvas.drawQR(this._qr);
                        }
                        return [4 /*yield*/, promise];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, canvas];
                }
            });
        });
    };
    QRCodeStyling.prototype.update = function (options) {
        QRCodeStyling._clearContainer(this._container);
        this._options = options ? sanitizeOptions(mergeDeep(this._options, options)) : this._options;
        if (!this._options.data) {
            return;
        }
        this._qr = qrcode(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel);
        this._qr.addData(this._options.data, this._options.qrOptions.mode || getMode(this._options.data));
        this._qr.make();
        if (this._options.type === drawTypes.canvas) {
            this._canvas = new QRCanvas(this._options);
            this._canvasDrawingPromise = this._canvas.drawQR(this._qr);
            this._svgDrawingPromise = undefined;
            this._svg = undefined;
        }
        else {
            this._svg = new QRSVG(this._options);
            this._svgDrawingPromise = this._svg.drawQR(this._qr);
            this._canvasDrawingPromise = undefined;
            this._canvas = undefined;
        }
        this.append(this._container);
    };
    QRCodeStyling.prototype.append = function (container) {
        if (!container) {
            return;
        }
        if (typeof container.appendChild !== "function") {
            throw "Container should be a single DOM node";
        }
        if (this._options.type === drawTypes.canvas) {
            if (this._canvas) {
                container.appendChild(this._canvas.getCanvas());
            }
        }
        else {
            if (this._svg) {
                container.appendChild(this._svg.getElement());
            }
        }
        this._container = container;
    };
    QRCodeStyling.prototype.getRawData = function (extension) {
        if (extension === void 0) { extension = "png"; }
        return __awaiter(this, void 0, void 0, function () {
            var element, serializer, source, svgString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._qr)
                            throw "QR code is empty";
                        return [4 /*yield*/, this._getQRStylingElement(extension)];
                    case 1:
                        element = _a.sent();
                        if (extension.toLowerCase() === "svg") {
                            serializer = new element._window.XMLSerializer();
                            source = serializer.serializeToString(element.getElement());
                            svgString = "<?xml version=\"1.0\" standalone=\"no\"?>\r\n" + source;
                            if (typeof Blob !== "undefined" && !this._options.jsdom) {
                                return [2 /*return*/, new Blob([svgString], { type: "image/svg+xml" })];
                            }
                            else {
                                return [2 /*return*/, Buffer.from(svgString)];
                            }
                        }
                        else {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    var canvas = element.getCanvas();
                                    if (canvas.toBuffer) {
                                        resolve(canvas.toBuffer("image/" + extension));
                                    }
                                    else {
                                        canvas.toBlob(resolve, "image/" + extension, 1);
                                    }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QRCodeStyling.prototype.download = function (downloadOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var extension, name, element, serializer, source, url, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._qr)
                            throw "QR code is empty";
                        if (typeof Blob === "undefined")
                            throw "Cannot download in Node.js, call getRawData instead.";
                        extension = "png";
                        name = "qr";
                        //TODO remove deprecated code in the v2
                        if (typeof downloadOptions === "string") {
                            extension = downloadOptions;
                            console.warn("Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument");
                        }
                        else if (typeof downloadOptions === "object" && downloadOptions !== null) {
                            if (downloadOptions.name) {
                                name = downloadOptions.name;
                            }
                            if (downloadOptions.extension) {
                                extension = downloadOptions.extension;
                            }
                        }
                        return [4 /*yield*/, this._getQRStylingElement(extension)];
                    case 1:
                        element = _a.sent();
                        if (extension.toLowerCase() === "svg") {
                            serializer = new XMLSerializer();
                            source = serializer.serializeToString(element.getElement());
                            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
                            url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
                            downloadURI(url, name + ".svg");
                        }
                        else {
                            url = element.getCanvas().toDataURL("image/" + extension);
                            downloadURI(url, name + "." + extension);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return QRCodeStyling;
}());
export default QRCodeStyling;
//# sourceMappingURL=QRCodeStyling.js.map
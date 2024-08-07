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
import cornerDotTypes from "../../../constants/cornerDotTypes";
var QRCornerDot = /** @class */ (function () {
    function QRCornerDot(_a) {
        var svg = _a.svg, type = _a.type, window = _a.window;
        this._svg = svg;
        this._type = type;
        this._window = window;
    }
    QRCornerDot.prototype.draw = function (x, y, size, rotation) {
        var type = this._type;
        var drawFunction;
        switch (type) {
            case cornerDotTypes.square:
                drawFunction = this._drawSquare;
                break;
            case cornerDotTypes.dot:
            default:
                drawFunction = this._drawDot;
        }
        drawFunction.call(this, { x: x, y: y, size: size, rotation: rotation });
    };
    QRCornerDot.prototype._rotateFigure = function (_a) {
        var _b;
        var x = _a.x, y = _a.y, size = _a.size, _c = _a.rotation, rotation = _c === void 0 ? 0 : _c, draw = _a.draw;
        var cx = x + size / 2;
        var cy = y + size / 2;
        draw();
        (_b = this._element) === null || _b === void 0 ? void 0 : _b.setAttribute("transform", "rotate(" + (180 * rotation) / Math.PI + "," + cx + "," + cy + ")");
    };
    QRCornerDot.prototype._basicDot = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "circle");
                _this._element.setAttribute("cx", String(x + size / 2));
                _this._element.setAttribute("cy", String(y + size / 2));
                _this._element.setAttribute("r", String(size / 2));
            } }));
    };
    QRCornerDot.prototype._basicSquare = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
                _this._element.setAttribute("x", String(x));
                _this._element.setAttribute("y", String(y));
                _this._element.setAttribute("width", String(size));
                _this._element.setAttribute("height", String(size));
            } }));
    };
    QRCornerDot.prototype._drawDot = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, rotation = _a.rotation;
        this._basicDot({ x: x, y: y, size: size, rotation: rotation });
    };
    QRCornerDot.prototype._drawSquare = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, rotation = _a.rotation;
        this._basicSquare({ x: x, y: y, size: size, rotation: rotation });
    };
    return QRCornerDot;
}());
export default QRCornerDot;
//# sourceMappingURL=QRCornerDot.js.map
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
        var context = _a.context, type = _a.type;
        this._context = context;
        this._type = type;
    }
    QRCornerDot.prototype.draw = function (x, y, size, rotation) {
        var context = this._context;
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
        drawFunction.call(this, { x: x, y: y, size: size, context: context, rotation: rotation });
    };
    QRCornerDot.prototype._rotateFigure = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, _b = _a.rotation, rotation = _b === void 0 ? 0 : _b, draw = _a.draw;
        var cx = x + size / 2;
        var cy = y + size / 2;
        context.translate(cx, cy);
        rotation && context.rotate(rotation);
        draw();
        context.closePath();
        rotation && context.rotate(-rotation);
        context.translate(-cx, -cy);
    };
    QRCornerDot.prototype._basicDot = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
            } }));
    };
    QRCornerDot.prototype._basicSquare = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.rect(-size / 2, -size / 2, size, size);
            } }));
    };
    QRCornerDot.prototype._drawDot = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, rotation = _a.rotation;
        this._basicDot({ x: x, y: y, size: size, context: context, rotation: rotation });
    };
    QRCornerDot.prototype._drawSquare = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, rotation = _a.rotation;
        this._basicSquare({ x: x, y: y, size: size, context: context, rotation: rotation });
    };
    return QRCornerDot;
}());
export default QRCornerDot;
//# sourceMappingURL=QRCornerDot.js.map
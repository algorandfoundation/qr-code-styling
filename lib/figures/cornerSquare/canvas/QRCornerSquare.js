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
import cornerSquareTypes from "../../../constants/cornerSquareTypes";
var QRCornerSquare = /** @class */ (function () {
    function QRCornerSquare(_a) {
        var context = _a.context, type = _a.type;
        this._context = context;
        this._type = type;
    }
    QRCornerSquare.prototype.draw = function (x, y, size, rotation) {
        var context = this._context;
        var type = this._type;
        var drawFunction;
        switch (type) {
            case cornerSquareTypes.square:
                drawFunction = this._drawSquare;
                break;
            case cornerSquareTypes.extraRounded:
                drawFunction = this._drawExtraRounded;
                break;
            case cornerSquareTypes.dot:
            default:
                drawFunction = this._drawDot;
        }
        drawFunction.call(this, { x: x, y: y, size: size, context: context, rotation: rotation });
    };
    QRCornerSquare.prototype._rotateFigure = function (_a) {
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
    QRCornerSquare.prototype._basicDot = function (args) {
        var size = args.size, context = args.context;
        var dotSize = size / 7;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
                context.arc(0, 0, size / 2 - dotSize, 0, Math.PI * 2);
            } }));
    };
    QRCornerSquare.prototype._basicSquare = function (args) {
        var size = args.size, context = args.context;
        var dotSize = size / 7;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.rect(-size / 2, -size / 2, size, size);
                context.rect(-size / 2 + dotSize, -size / 2 + dotSize, size - 2 * dotSize, size - 2 * dotSize);
            } }));
    };
    QRCornerSquare.prototype._basicExtraRounded = function (args) {
        var size = args.size, context = args.context;
        var dotSize = size / 7;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
                context.lineTo(dotSize, -3.5 * dotSize);
                context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
                context.lineTo(3.5 * dotSize, -dotSize);
                context.arc(dotSize, dotSize, 2.5 * dotSize, 0, Math.PI / 2);
                context.lineTo(-dotSize, 3.5 * dotSize);
                context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
                context.lineTo(-3.5 * dotSize, -dotSize);
                context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
                context.lineTo(dotSize, -2.5 * dotSize);
                context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
                context.lineTo(2.5 * dotSize, -dotSize);
                context.arc(dotSize, dotSize, 1.5 * dotSize, 0, Math.PI / 2);
                context.lineTo(-dotSize, 2.5 * dotSize);
                context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
                context.lineTo(-2.5 * dotSize, -dotSize);
            } }));
    };
    QRCornerSquare.prototype._drawDot = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, rotation = _a.rotation;
        this._basicDot({ x: x, y: y, size: size, context: context, rotation: rotation });
    };
    QRCornerSquare.prototype._drawSquare = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, rotation = _a.rotation;
        this._basicSquare({ x: x, y: y, size: size, context: context, rotation: rotation });
    };
    QRCornerSquare.prototype._drawExtraRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, rotation = _a.rotation;
        this._basicExtraRounded({ x: x, y: y, size: size, context: context, rotation: rotation });
    };
    return QRCornerSquare;
}());
export default QRCornerSquare;
//# sourceMappingURL=QRCornerSquare.js.map
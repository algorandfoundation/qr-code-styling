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
import dotTypes from "../../../constants/dotTypes";
var QRDot = /** @class */ (function () {
    function QRDot(_a) {
        var context = _a.context, type = _a.type;
        this._context = context;
        this._type = type;
    }
    QRDot.prototype.draw = function (x, y, size, getNeighbor) {
        var context = this._context;
        var type = this._type;
        var drawFunction;
        switch (type) {
            case dotTypes.dots:
                drawFunction = this._drawDot;
                break;
            case dotTypes.classy:
                drawFunction = this._drawClassy;
                break;
            case dotTypes.classyRounded:
                drawFunction = this._drawClassyRounded;
                break;
            case dotTypes.rounded:
                drawFunction = this._drawRounded;
                break;
            case dotTypes.extraRounded:
                drawFunction = this._drawExtraRounded;
                break;
            case dotTypes.square:
            default:
                drawFunction = this._drawSquare;
        }
        drawFunction.call(this, { x: x, y: y, size: size, context: context, getNeighbor: getNeighbor });
    };
    QRDot.prototype._rotateFigure = function (_a) {
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
    QRDot.prototype._basicDot = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
            } }));
    };
    QRDot.prototype._basicSquare = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.rect(-size / 2, -size / 2, size, size);
            } }));
    };
    //if rotation === 0 - right side is rounded
    QRDot.prototype._basicSideRounded = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, -Math.PI / 2, Math.PI / 2);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            } }));
    };
    //if rotation === 0 - top right corner is rounded
    QRDot.prototype._basicCornerRounded = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, -Math.PI / 2, 0);
                context.lineTo(size / 2, size / 2);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            } }));
    };
    //if rotation === 0 - top right corner is rounded
    QRDot.prototype._basicCornerExtraRounded = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
            } }));
    };
    QRDot.prototype._basicCornersRounded = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(0, 0, size / 2, -Math.PI / 2, 0);
                context.lineTo(size / 2, size / 2);
                context.lineTo(0, size / 2);
                context.arc(0, 0, size / 2, Math.PI / 2, Math.PI);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            } }));
    };
    QRDot.prototype._basicCornersExtraRounded = function (args) {
        var size = args.size, context = args.context;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
                context.arc(size / 2, -size / 2, size, Math.PI / 2, Math.PI);
            } }));
    };
    QRDot.prototype._drawDot = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context;
        this._basicDot({ x: x, y: y, size: size, context: context, rotation: 0 });
    };
    QRDot.prototype._drawSquare = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context;
        this._basicSquare({ x: x, y: y, size: size, context: context, rotation: 0 });
    };
    QRDot.prototype._drawRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicDot({ x: x, y: y, size: size, context: context, rotation: 0 });
            return;
        }
        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x: x, y: y, size: size, context: context, rotation: 0 });
            return;
        }
        if (neighborsCount === 2) {
            var rotation = 0;
            if (leftNeighbor && topNeighbor) {
                rotation = Math.PI / 2;
            }
            else if (topNeighbor && rightNeighbor) {
                rotation = Math.PI;
            }
            else if (rightNeighbor && bottomNeighbor) {
                rotation = -Math.PI / 2;
            }
            this._basicCornerRounded({ x: x, y: y, size: size, context: context, rotation: rotation });
            return;
        }
        if (neighborsCount === 1) {
            var rotation = 0;
            if (topNeighbor) {
                rotation = Math.PI / 2;
            }
            else if (rightNeighbor) {
                rotation = Math.PI;
            }
            else if (bottomNeighbor) {
                rotation = -Math.PI / 2;
            }
            this._basicSideRounded({ x: x, y: y, size: size, context: context, rotation: rotation });
            return;
        }
    };
    QRDot.prototype._drawExtraRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicDot({ x: x, y: y, size: size, context: context, rotation: 0 });
            return;
        }
        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x: x, y: y, size: size, context: context, rotation: 0 });
            return;
        }
        if (neighborsCount === 2) {
            var rotation = 0;
            if (leftNeighbor && topNeighbor) {
                rotation = Math.PI / 2;
            }
            else if (topNeighbor && rightNeighbor) {
                rotation = Math.PI;
            }
            else if (rightNeighbor && bottomNeighbor) {
                rotation = -Math.PI / 2;
            }
            this._basicCornerExtraRounded({ x: x, y: y, size: size, context: context, rotation: rotation });
            return;
        }
        if (neighborsCount === 1) {
            var rotation = 0;
            if (topNeighbor) {
                rotation = Math.PI / 2;
            }
            else if (rightNeighbor) {
                rotation = Math.PI;
            }
            else if (bottomNeighbor) {
                rotation = -Math.PI / 2;
            }
            this._basicSideRounded({ x: x, y: y, size: size, context: context, rotation: rotation });
            return;
        }
    };
    QRDot.prototype._drawClassy = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicCornersRounded({ x: x, y: y, size: size, context: context, rotation: Math.PI / 2 });
            return;
        }
        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerRounded({ x: x, y: y, size: size, context: context, rotation: -Math.PI / 2 });
            return;
        }
        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerRounded({ x: x, y: y, size: size, context: context, rotation: Math.PI / 2 });
            return;
        }
        this._basicSquare({ x: x, y: y, size: size, context: context, rotation: 0 });
    };
    QRDot.prototype._drawClassyRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, context = _a.context, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicCornersRounded({ x: x, y: y, size: size, context: context, rotation: Math.PI / 2 });
            return;
        }
        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerExtraRounded({ x: x, y: y, size: size, context: context, rotation: -Math.PI / 2 });
            return;
        }
        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerExtraRounded({ x: x, y: y, size: size, context: context, rotation: Math.PI / 2 });
            return;
        }
        this._basicSquare({ x: x, y: y, size: size, context: context, rotation: 0 });
    };
    return QRDot;
}());
export default QRDot;
//# sourceMappingURL=QRDot.js.map
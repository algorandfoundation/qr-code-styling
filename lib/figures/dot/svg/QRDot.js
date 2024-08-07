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
        var svg = _a.svg, type = _a.type, window = _a.window;
        this._svg = svg;
        this._type = type;
        this._window = window;
    }
    QRDot.prototype.draw = function (x, y, size, getNeighbor) {
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
        drawFunction.call(this, { x: x, y: y, size: size, getNeighbor: getNeighbor });
    };
    QRDot.prototype._rotateFigure = function (_a) {
        var _b;
        var x = _a.x, y = _a.y, size = _a.size, _c = _a.rotation, rotation = _c === void 0 ? 0 : _c, draw = _a.draw;
        var cx = x + size / 2;
        var cy = y + size / 2;
        draw();
        (_b = this._element) === null || _b === void 0 ? void 0 : _b.setAttribute("transform", "rotate(" + (180 * rotation) / Math.PI + "," + cx + "," + cy + ")");
    };
    QRDot.prototype._basicDot = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "circle");
                _this._element.setAttribute("cx", String(x + size / 2));
                _this._element.setAttribute("cy", String(y + size / 2));
                _this._element.setAttribute("r", String(size / 2));
            } }));
    };
    QRDot.prototype._basicSquare = function (args) {
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
    //if rotation === 0 - right side is rounded
    QRDot.prototype._basicSideRounded = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
                _this._element.setAttribute("d", "M " + x + " " + y + //go to top left position
                    ("v " + size) + //draw line to left bottom corner
                    ("h " + size / 2) + //draw line to left bottom corner + half of size right
                    ("a " + size / 2 + " " + size / 2 + ", 0, 0, 0, 0 " + -size) // draw rounded corner
                );
            } }));
    };
    //if rotation === 0 - top right corner is rounded
    QRDot.prototype._basicCornerRounded = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
                _this._element.setAttribute("d", "M " + x + " " + y + //go to top left position
                    ("v " + size) + //draw line to left bottom corner
                    ("h " + size) + //draw line to right bottom corner
                    ("v " + -size / 2) + //draw line to right bottom corner + half of size top
                    ("a " + size / 2 + " " + size / 2 + ", 0, 0, 0, " + -size / 2 + " " + -size / 2) // draw rounded corner
                );
            } }));
    };
    //if rotation === 0 - top right corner is rounded
    QRDot.prototype._basicCornerExtraRounded = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
                _this._element.setAttribute("d", "M " + x + " " + y + //go to top left position
                    ("v " + size) + //draw line to left bottom corner
                    ("h " + size) + //draw line to right bottom corner
                    ("a " + size + " " + size + ", 0, 0, 0, " + -size + " " + -size) // draw rounded top right corner
                );
            } }));
    };
    //if rotation === 0 - left bottom and right top corners are rounded
    QRDot.prototype._basicCornersRounded = function (args) {
        var _this = this;
        var size = args.size, x = args.x, y = args.y;
        this._rotateFigure(__assign(__assign({}, args), { draw: function () {
                _this._element = _this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
                _this._element.setAttribute("d", "M " + x + " " + y + //go to left top position
                    ("v " + size / 2) + //draw line to left top corner + half of size bottom
                    ("a " + size / 2 + " " + size / 2 + ", 0, 0, 0, " + size / 2 + " " + size / 2) + // draw rounded left bottom corner
                    ("h " + size / 2) + //draw line to right bottom corner
                    ("v " + -size / 2) + //draw line to right bottom corner + half of size top
                    ("a " + size / 2 + " " + size / 2 + ", 0, 0, 0, " + -size / 2 + " " + -size / 2) // draw rounded right top corner
                );
            } }));
    };
    QRDot.prototype._drawDot = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size;
        this._basicDot({ x: x, y: y, size: size, rotation: 0 });
    };
    QRDot.prototype._drawSquare = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size;
        this._basicSquare({ x: x, y: y, size: size, rotation: 0 });
    };
    QRDot.prototype._drawRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicDot({ x: x, y: y, size: size, rotation: 0 });
            return;
        }
        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x: x, y: y, size: size, rotation: 0 });
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
            this._basicCornerRounded({ x: x, y: y, size: size, rotation: rotation });
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
            this._basicSideRounded({ x: x, y: y, size: size, rotation: rotation });
            return;
        }
    };
    QRDot.prototype._drawExtraRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicDot({ x: x, y: y, size: size, rotation: 0 });
            return;
        }
        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x: x, y: y, size: size, rotation: 0 });
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
            this._basicCornerExtraRounded({ x: x, y: y, size: size, rotation: rotation });
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
            this._basicSideRounded({ x: x, y: y, size: size, rotation: rotation });
            return;
        }
    };
    QRDot.prototype._drawClassy = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicCornersRounded({ x: x, y: y, size: size, rotation: Math.PI / 2 });
            return;
        }
        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerRounded({ x: x, y: y, size: size, rotation: -Math.PI / 2 });
            return;
        }
        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerRounded({ x: x, y: y, size: size, rotation: Math.PI / 2 });
            return;
        }
        this._basicSquare({ x: x, y: y, size: size, rotation: 0 });
    };
    QRDot.prototype._drawClassyRounded = function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, getNeighbor = _a.getNeighbor;
        var leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        var rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        var topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        var bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
        var neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;
        if (neighborsCount === 0) {
            this._basicCornersRounded({ x: x, y: y, size: size, rotation: Math.PI / 2 });
            return;
        }
        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerExtraRounded({ x: x, y: y, size: size, rotation: -Math.PI / 2 });
            return;
        }
        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerExtraRounded({ x: x, y: y, size: size, rotation: Math.PI / 2 });
            return;
        }
        this._basicSquare({ x: x, y: y, size: size, rotation: 0 });
    };
    return QRDot;
}());
export default QRDot;
//# sourceMappingURL=QRDot.js.map
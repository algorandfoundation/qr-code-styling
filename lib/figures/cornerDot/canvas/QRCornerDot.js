import cornerDotTypes from "../../../constants/cornerDotTypes.js";
export default class QRCornerDot {
    constructor({ context, type }) {
        this._context = context;
        this._type = type;
    }
    draw(x, y, size, rotation) {
        const context = this._context;
        const type = this._type;
        let drawFunction;
        switch (type) {
            case cornerDotTypes.square:
                drawFunction = this._drawSquare;
                break;
            case cornerDotTypes.dot:
            default:
                drawFunction = this._drawDot;
        }
        drawFunction.call(this, { x, y, size, context, rotation });
    }
    _rotateFigure({ x, y, size, context, rotation = 0, draw }) {
        const cx = x + size / 2;
        const cy = y + size / 2;
        context.translate(cx, cy);
        rotation && context.rotate(rotation);
        draw();
        context.closePath();
        rotation && context.rotate(-rotation);
        context.translate(-cx, -cy);
    }
    _basicDot(args) {
        const { size, context } = args;
        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
            }
        });
    }
    _basicSquare(args) {
        const { size, context } = args;
        this._rotateFigure({
            ...args,
            draw: () => {
                context.rect(-size / 2, -size / 2, size, size);
            }
        });
    }
    _drawDot({ x, y, size, context, rotation }) {
        this._basicDot({ x, y, size, context, rotation });
    }
    _drawSquare({ x, y, size, context, rotation }) {
        this._basicSquare({ x, y, size, context, rotation });
    }
}
//# sourceMappingURL=QRCornerDot.js.map
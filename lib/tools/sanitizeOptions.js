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
function sanitizeGradient(gradient) {
    var newGradient = __assign({}, gradient);
    if (!newGradient.colorStops || !newGradient.colorStops.length) {
        throw "Field 'colorStops' is required in gradient";
    }
    if (newGradient.rotation) {
        newGradient.rotation = Number(newGradient.rotation);
    }
    else {
        newGradient.rotation = 0;
    }
    newGradient.colorStops = newGradient.colorStops.map(function (colorStop) { return (__assign(__assign({}, colorStop), { offset: Number(colorStop.offset) })); });
    return newGradient;
}
export default function sanitizeOptions(options) {
    var newOptions = __assign({}, options);
    newOptions.width = Number(newOptions.width);
    newOptions.height = Number(newOptions.height);
    newOptions.margin = Number(newOptions.margin);
    newOptions.imageOptions = __assign(__assign({}, newOptions.imageOptions), { hideBackgroundDots: Boolean(newOptions.imageOptions.hideBackgroundDots), imageSize: Number(newOptions.imageOptions.imageSize), margin: Number(newOptions.imageOptions.margin) });
    if (newOptions.margin > Math.min(newOptions.width, newOptions.height)) {
        newOptions.margin = Math.min(newOptions.width, newOptions.height);
    }
    newOptions.dotsOptions = __assign({}, newOptions.dotsOptions);
    if (newOptions.dotsOptions.gradient) {
        newOptions.dotsOptions.gradient = sanitizeGradient(newOptions.dotsOptions.gradient);
    }
    if (newOptions.cornersSquareOptions) {
        newOptions.cornersSquareOptions = __assign({}, newOptions.cornersSquareOptions);
        if (newOptions.cornersSquareOptions.gradient) {
            newOptions.cornersSquareOptions.gradient = sanitizeGradient(newOptions.cornersSquareOptions.gradient);
        }
    }
    if (newOptions.cornersDotOptions) {
        newOptions.cornersDotOptions = __assign({}, newOptions.cornersDotOptions);
        if (newOptions.cornersDotOptions.gradient) {
            newOptions.cornersDotOptions.gradient = sanitizeGradient(newOptions.cornersDotOptions.gradient);
        }
    }
    if (newOptions.backgroundOptions) {
        newOptions.backgroundOptions = __assign({}, newOptions.backgroundOptions);
        if (newOptions.backgroundOptions.gradient) {
            newOptions.backgroundOptions.gradient = sanitizeGradient(newOptions.backgroundOptions.gradient);
        }
    }
    return newOptions;
}
//# sourceMappingURL=sanitizeOptions.js.map
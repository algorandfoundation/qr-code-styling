import getMode from "../tools/getMode.js";
import mergeDeep from "../tools/merge.js";
import downloadURI from "../tools/downloadURI.js";
import QRSVG from "./QRSVG.js";
import drawTypes from "../constants/drawTypes.js";
import defaultOptions from "./QROptions.js";
import sanitizeOptions from "../tools/sanitizeOptions.js";
import qrcode from "qrcode-generator";
export default class QRCodeStyling {
    constructor(options) {
        this._options = options ? sanitizeOptions(mergeDeep(defaultOptions, options)) : defaultOptions;
        this.update();
    }
    static _clearContainer(container) {
        if (container) {
            container.innerHTML = "";
        }
    }
    _setupSvg() {
        if (!this._qr) {
            return;
        }
        const qrSVG = new QRSVG(this._options);
        this._svg = qrSVG.getElement();
        this._svgDrawingPromise = qrSVG.drawQR(this._qr).then(() => {
            if (!this._svg)
                return;
            this._extension?.(qrSVG.getElement(), this._options);
        });
    }
    _setupCanvas() {
        if (!this._qr) {
            return;
        }
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._options.width;
        this._canvas.height = this._options.height;
        this._setupSvg();
        this._canvasDrawingPromise = this._svgDrawingPromise?.then(() => {
            if (!this._svg)
                return;
            const svg = this._svg;
            const xml = new XMLSerializer().serializeToString(svg);
            const svg64 = btoa(xml);
            const image64 = "data:image/svg+xml;base64," + svg64;
            const image = new Image();
            return new Promise((resolve) => {
                image.onload = () => {
                    this._canvas?.getContext("2d")?.drawImage(image, 0, 0);
                    resolve();
                };
                image.src = image64;
            });
        });
    }
    async _getElement(extension = "png") {
        if (!this._qr)
            throw "QR code is empty";
        if (extension.toLowerCase() === "svg") {
            if (!this._svg || !this._svgDrawingPromise) {
                this._setupSvg();
            }
            await this._svgDrawingPromise;
            return this._svg;
        }
        else {
            if (!this._canvas || !this._canvasDrawingPromise) {
                this._setupCanvas();
            }
            await this._canvasDrawingPromise;
            return this._canvas;
        }
    }
    update(options) {
        QRCodeStyling._clearContainer(this._container);
        this._options = options ? sanitizeOptions(mergeDeep(this._options, options)) : this._options;
        if (!this._options.data) {
            return;
        }
        this._qr = qrcode(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel);
        this._qr.addData(this._options.data, this._options.qrOptions.mode || getMode(this._options.data));
        this._qr.make();
        if (this._options.type === drawTypes.canvas) {
            this._setupCanvas();
        }
        else {
            this._setupSvg();
        }
        this.append(this._container);
    }
    append(container) {
        if (!container) {
            return;
        }
        if (typeof container.appendChild !== "function") {
            throw "Container should be a single DOM node";
        }
        if (this._options.type === drawTypes.canvas) {
            if (this._canvas) {
                container.appendChild(this._canvas);
            }
        }
        else {
            if (this._svg) {
                container.appendChild(this._svg);
            }
        }
        this._container = container;
    }
    applyExtension(extension) {
        if (!extension) {
            throw "Extension function should be defined.";
        }
        this._extension = extension;
        this.update();
    }
    deleteExtension() {
        this._extension = undefined;
        this.update();
    }
    async getRawData(extension = "png") {
        if (!this._qr)
            throw "QR code is empty";
        const element = await this._getElement(extension);
        if (!element) {
            return null;
        }
        if (extension.toLowerCase() === "svg") {
            const serializer = new XMLSerializer();
            const source = serializer.serializeToString(element);
            return new Blob(['<?xml version="1.0" standalone="no"?>\r\n' + source], { type: "image/svg+xml" });
        }
        else {
            return new Promise((resolve) => element.toBlob(resolve, `image/${extension}`, 1));
        }
    }
    async download(downloadOptions) {
        if (!this._qr)
            throw "QR code is empty";
        let extension = "png";
        let name = "qr";
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
        const element = await this._getElement(extension);
        if (!element) {
            return;
        }
        if (extension.toLowerCase() === "svg") {
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(element);
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
            const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            downloadURI(url, `${name}.svg`);
        }
        else {
            const url = element.toDataURL(`image/${extension}`);
            downloadURI(url, `${name}.${extension}`);
        }
    }
}
//# sourceMappingURL=QRCodeStyling.js.map
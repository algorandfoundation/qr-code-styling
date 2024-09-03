import qrTypes from "../constants/qrTypes.js";
import drawTypes from "../constants/drawTypes.js";
import shapeTypes from "../constants/shapeTypes.js";
import errorCorrectionLevels from "../constants/errorCorrectionLevels.js";
const defaultOptions = {
    type: drawTypes.canvas,
    shape: shapeTypes.square,
    width: 300,
    height: 300,
    data: "",
    margin: 0,
    qrOptions: {
        typeNumber: qrTypes[0],
        mode: undefined,
        errorCorrectionLevel: errorCorrectionLevels.Q
    },
    imageOptions: {
        saveAsBlob: false,
        hideBackgroundDots: true,
        imageSize: 0.4,
        crossOrigin: undefined,
        margin: 0
    },
    dotsOptions: {
        type: "square",
        color: "#000"
    },
    backgroundOptions: {
        round: 0,
        color: "#fff"
    }
};
export default defaultOptions;
//# sourceMappingURL=QROptions.js.map
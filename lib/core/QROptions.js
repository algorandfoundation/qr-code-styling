import qrTypes from "../constants/qrTypes";
import drawTypes from "../constants/drawTypes";
import errorCorrectionLevels from "../constants/errorCorrectionLevels";
var defaultOptions = {
    type: drawTypes.canvas,
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
        color: "#fff"
    }
};
export default defaultOptions;
//# sourceMappingURL=QROptions.js.map
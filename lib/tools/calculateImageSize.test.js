import calculateImageSize from "./calculateImageSize";
describe("Test calculateImageSizeForAxis function", function () {
    it("The function should return an correct result for 0 sizes", function () {
        expect(calculateImageSize({
            originalHeight: 0,
            originalWidth: 0,
            maxHiddenDots: 0,
            dotSize: 0
        })).toEqual({
            height: 0,
            width: 0,
            hideYDots: 0,
            hideXDots: 0
        });
    });
    it("The function should return an correct result for minus values", function () {
        expect(calculateImageSize({
            originalHeight: -1,
            originalWidth: 5,
            maxHiddenDots: 11,
            dotSize: -5
        })).toEqual({
            height: 0,
            width: 0,
            hideYDots: 0,
            hideXDots: 0
        });
    });
    it("The function should return an correct result for small images", function () {
        expect(calculateImageSize({
            originalHeight: 20,
            originalWidth: 10,
            maxHiddenDots: 1,
            dotSize: 10
        })).toEqual({
            height: 10,
            width: 5,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it("The function should return an correct result for small images, if height is smaller than width", function () {
        expect(calculateImageSize({
            originalHeight: 10,
            originalWidth: 20,
            maxHiddenDots: 1,
            dotSize: 10
        })).toEqual({
            height: 5,
            width: 10,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it("The function should return an correct result for large images", function () {
        expect(calculateImageSize({
            originalHeight: 1000,
            originalWidth: 2020,
            maxHiddenDots: 50,
            dotSize: 10
        })).toEqual({
            height: 45,
            width: 90,
            hideYDots: 5,
            hideXDots: 9
        });
    });
    it("Use the maxHiddenAxisDots value for x", function () {
        expect(calculateImageSize({
            originalHeight: 1000,
            originalWidth: 2020,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 1
        })).toEqual({
            height: 5,
            width: 10,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it("Use the maxHiddenAxisDots value for y", function () {
        expect(calculateImageSize({
            originalHeight: 2020,
            originalWidth: 1000,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 1
        })).toEqual({
            height: 10,
            width: 5,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it("Use the maxHiddenAxisDots value for y with even value", function () {
        expect(calculateImageSize({
            originalHeight: 2020,
            originalWidth: 1000,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 2
        })).toEqual({
            height: 20,
            width: 10,
            hideYDots: 2,
            hideXDots: 1
        });
    });
});
//# sourceMappingURL=calculateImageSize.test.js.map
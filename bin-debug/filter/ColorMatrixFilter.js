var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorMatrixFilter = (function (_super) {
    __extends(ColorMatrixFilter, _super);
    //颜色矩阵滤镜，ColorMatrixFilter为 4行5列的多维矩阵(20个元素的数组)。该类允许饱和度更改、色相旋转、亮度为 Alpha 以及各种其他效果。
    /*
    redResult   = (a[0] * srcR)  + (a[1] * srcG)  + (a[2] * srcB)  + (a[3] * srcA)  + a[4];
    greenResult = (a[5] * srcR)  + (a[6] * srcG)  + (a[7] * srcB)  + (a[8] * srcA)  + a[9];
    blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14];
    alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19];
    公式中 srcR、srcG、srcB、srcA 表示原始显示对象的像素值, a 即我们设置的颜色矩阵的数组。
    */
    function ColorMatrixFilter() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ColorMatrixFilter.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/hero4.png");
    };
    ColorMatrixFilter.prototype.imgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        var img = new egret.Bitmap(bmd);
        this.addChild(img);
        //灰度矩阵
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var redColorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        var greenColorMatrix = [
            1, 0, 0, 0, 0,
            0, 2, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        //增加亮度
        var brightnessAddColorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 100,
            0, 0, 1, 0, 100,
            0, 0, 0, 1, 0
        ];
        var colorFilter = new egret.ColorMatrixFilter(brightnessAddColorMatrix);
        img.filters = [colorFilter];
        img.y = 30;
    };
    return ColorMatrixFilter;
}(egret.DisplayObjectContainer));
__reflect(ColorMatrixFilter.prototype, "ColorMatrixFilter");
//# sourceMappingURL=ColorMatrixFilter.js.map
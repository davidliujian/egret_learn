var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlurFilter = (function (_super) {
    __extends(BlurFilter, _super);
    /*
    可使用 BlurFilter 类将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。您可以生成一些模糊效果，
        范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
    */
    function BlurFilter() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BlurFilter.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/hero4.png");
    };
    BlurFilter.prototype.imgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        var img = new egret.Bitmap(bmd);
        this.addChild(img);
        var blurFilter = new egret.BlurFilter(2, 2);
        img.filters = [blurFilter];
    };
    return BlurFilter;
}(egret.DisplayObjectContainer));
__reflect(BlurFilter.prototype, "BlurFilter");
//# sourceMappingURL=BlurFilter.js.map
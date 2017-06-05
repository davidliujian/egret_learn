var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImgLoader = (function (_super) {
    __extends(ImgLoader, _super);
    function ImgLoader() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ImgLoader.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoaderHandler, this); //添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听
        imgLoader.load("resource/assets/bg.jpg");
    };
    ImgLoader.prototype.imgLoaderHandler = function (evt) {
        var loader = evt.currentTarget;
        var bmd = loader.data;
        var bmp = new egret.Bitmap(bmd);
        this.addChild(bmp);
    };
    return ImgLoader;
}(egret.DisplayObjectContainer));
__reflect(ImgLoader.prototype, "ImgLoader");
//# sourceMappingURL=ImgLoader.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BitmapTest = (function (_super) {
    __extends(BitmapTest, _super);
    function BitmapTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BitmapTest.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    };
    BitmapTest.prototype.onGroupComp = function () {
        var img = new egret.Bitmap();
        img.texture = RES.getRes("border_png");
        img.width *= 3;
        img.x = 50;
        this.addChild(img);
        var img2 = new egret.Bitmap();
        img2.texture = RES.getRes("border_png");
        var rect = new egret.Rectangle(30, 31, 40, 41);
        img2.scale9Grid = rect; //在设置这样的九宫格参数后，我们再次拉伸我们的图像就不会发生变形的现象。
        img2.width *= 3;
        img2.x = 50;
        img2.y = 150;
        this.addChild(img2);
        var img3 = new egret.Bitmap();
        img3.texture = RES.getRes("egret_icon_png");
        img3.width *= 2;
        img3.height *= 3;
        img3.y = 200;
        img3.fillMode = egret.BitmapFillMode.REPEAT; //纹理的填充方式。默认是拉伸图片
        this.addChild(img3);
        //      var texture:egret.Texture = RES.getRes("run_png");
        //       texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));//裁剪指定区域并保存成图片。
    };
    return BitmapTest;
}(egret.DisplayObjectContainer));
__reflect(BitmapTest.prototype, "BitmapTest");
//# sourceMappingURL=BitmapTest.js.map
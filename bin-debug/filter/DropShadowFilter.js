var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DropShadowFilter = (function (_super) {
    __extends(DropShadowFilter, _super);
    /*
        可使用 DropShadowFilter 类向显示对象添加投影
            
        DropShadowFilter ( distance :number, angle :number, color :number, alpha :number, blurX :number, blurY :number, strength :number,
                    quality :number, inner :boolean, knockout :boolean, hideObject :boolean )
    */
    function DropShadowFilter() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DropShadowFilter.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/pig-green.png");
    };
    DropShadowFilter.prototype.imgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        var img = new egret.Bitmap(bmd);
        var img2 = new egret.Bitmap(bmd);
        this.addChild(img2);
        img.x = 150;
        this.addChild(img);
        var distance = 6; /// 阴影的偏移距离，以像素为单位
        var angle = 45; /// 阴影的角度，0 到 360 度
        var color = 0x000000; /// 阴影的颜色，不包含透明度
        var alpha = 0.7; /// 光晕的颜色透明度，是对 color 参数的透明度设定
        var blurX = 16; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 16; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 0.65; /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 1 /* LOW */; /// 应用滤镜的次数，暂无实现
        var inner = false; /// 指定发光是否为内侧发光
        var knockout = false; /// 指定对象是否具有挖空效果
        var dropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);
        img.filters = [dropShadowFilter];
    };
    return DropShadowFilter;
}(egret.DisplayObjectContainer));
__reflect(DropShadowFilter.prototype, "DropShadowFilter");
//# sourceMappingURL=DropShadowFilter.js.map
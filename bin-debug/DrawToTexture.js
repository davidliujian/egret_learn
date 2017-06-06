/**
 * @copyright www.egret.com
 * @author city
 * @desc 动态截屏是一项非常酷的功能，他可以将指定显示对象(当然包括显示容器)中特
 *      定区域进行动态截取，保存为纹理格式，因此可以立即以位图的方式呈现出来！
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawToTexture = (function (_super) {
    __extends(DrawToTexture, _super);
    function DrawToTexture() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DrawToTexture.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/pig-green.png");
    };
    DrawToTexture.prototype.imgLoadHandler = function (evt) {
        var _this = this;
        /////////////////////////////////////////////// 提示信息部分 ////////////////////////////
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text =
            "屏幕分为两个小区域，上方是画面变换区域，下方是截屏显示区域。" +
                "\n轻触屏幕进行截屏！";
        this._txInfo.x = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.y = 50;
        //this._txInfo.y = this.stage.stageHeight - this._txInfo.height - L.PADDING_SIDE;
        var yClipsStart = this._txInfo.x + this._txInfo.height + L.GAP_UNIFIED;
        L.W_CLIP = this.stage.stageWidth - L.GAP_UNIFIED * 2;
        L.H_CLIP = (this.stage.stageHeight - (yClipsStart + L.GAP_UNIFIED * 2)) / 2;
        this._rectClip = new egret.Rectangle(0, 0, L.W_CLIP, L.H_CLIP);
        //egret.log( "L.H_CLIP:", L.H_CLIP );
        /////////////////////////////////////////////// 动画容器部分 ////////////////////////////
        /// 建立动画容器，放置若干运动白鹭小鸟 上方
        var bmd = evt.currentTarget.data;
        this._contMotion = new egret.Sprite;
        this._contMotion.x = L.GAP_UNIFIED;
        this._contMotion.y = yClipsStart;
        this.addChild(this._contMotion);
        console.log(this._txInfo.y);
        /// 容器加入随机纯色背景
        var iFillColor = (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
        var shpBg = new egret.Shape;
        shpBg.graphics.beginFill(iFillColor);
        shpBg.graphics.drawRect(0, 0, L.W_CLIP, L.H_CLIP);
        shpBg.graphics.endFill();
        shpBg.cacheAsBitmap = true;
        this._contMotion.addChild(shpBg);
        this._contMotion.mask = this._rectClip;
        /// 填入随机位置白鹭小鸟若干
        this._vcBird = new Array();
        for (var i = 0; i < 24; ++i) {
            var bird = new MotionBMP(evt.currentTarget.data);
            bird.anchorOffsetX = bird.width / 2;
            bird.anchorOffsetY = bird.height / 2;
            bird.x = L.W_CLIP * Math.random();
            bird.y = L.H_CLIP * Math.random();
            bird.scaleX = bird.scaleY = .5;
            //           bird.vx = Math.random() > 0.9 ? ( 1 + Math.random() * 5 ) * ( Math.random() > .5 ? 1 : -1 ) : 0;
            //          bird.vy = Math.random() > 0.9 ? ( 1 + Math.random() * 5 ) * ( Math.random() > .5 ? 1 : -1 ) : 0;
            bird.vx = (1 + Math.random() * 5) * (Math.random() > .5 ? 1 : -1);
            bird.vy = (1 + Math.random() * 5) * (Math.random() > .5 ? 1 : -1);
            console.log(bird.vx + "   " + bird.vy);
            bird.va = (1 + Math.random() * 3) * (Math.random() > .5 ? 1 : -1);
            this._contMotion.addChild(bird);
            this._vcBird.push(bird);
        }
        /////////////////////////////////////////////// 快照部分 ////////////////////////////
        /// 建立快照位图  下方 
        this._bmpSnap = new egret.Bitmap;
        //this._bmpSnap.anchorOffsetX = L.W_CLIP / 2;
        //this._bmpSnap.anchorOffsetY = L.H_CLIP / 2;
        this._bmpSnap.x = L.GAP_UNIFIED;
        this._bmpSnap.y = this._contMotion.y + L.H_CLIP + L.GAP_UNIFIED;
        this.addChild(this._bmpSnap);
        /// 快照特效
        this._shapeSnapEffect = new egret.Shape;
        this._shapeSnapEffect.graphics.beginFill(0xFFFFFF);
        this._shapeSnapEffect.graphics.drawRect(0, 0, L.W_CLIP, L.H_CLIP);
        this._shapeSnapEffect.graphics.endFill();
        this._shapeSnapEffect.cacheAsBitmap = true;
        //this._shapeSnapEffect.anchorOffsetX = L.W_CLIP / 2;
        //this._shapeSnapEffect.anchorOffsetY = L.H_CLIP / 2;
        this._shapeSnapEffect.x = this._bmpSnap.x;
        this._shapeSnapEffect.y = this._bmpSnap.y;
        /////////////////////////////////////////////// 事件处理部分 ////////////////////////////
        /// 触摸文字区域产生截图
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("take!");
            /*** 本示例关键代码段开始 ***/
            var rt = new egret.RenderTexture;
            rt.drawToTexture(_this._contMotion, _this._rectClip);
            _this._bmpSnap.texture = rt;
            /*** 本示例关键代码段结束 ***/
            /// 快照特效
            _this.addChild(_this._shapeSnapEffect);
            _this._shapeSnapEffect.alpha = 1;
            egret.Tween.get(_this._shapeSnapEffect).to({ alpha: 0 }, 500).call(function () {
                if (_this._shapeSnapEffect.parent)
                    _this._shapeSnapEffect.parent.removeChild(_this._shapeSnapEffect);
            });
        }, this);
        /// 动画一致持续中
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            for (var i = _this._vcBird.length - 1; i > -1; --i) {
                var bird = _this._vcBird[i];
                var xTo = bird.x + bird.vx;
                if (xTo > L.W_CLIP || xTo < 0)
                    bird.vx = -bird.vx;
                bird.x = xTo;
                var yTo = bird.y + bird.vy;
                if (yTo > L.H_CLIP || yTo < 0)
                    bird.vy = -bird.vy;
                bird.y = yTo;
                bird.rotation += bird.va;
            }
        }, this);
    };
    return DrawToTexture;
}(egret.DisplayObjectContainer));
__reflect(DrawToTexture.prototype, "DrawToTexture");
/// 包含运动速度的位图
var MotionBMP = (function (_super) {
    __extends(MotionBMP, _super);
    function MotionBMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MotionBMP;
}(egret.Bitmap));
__reflect(MotionBMP.prototype, "MotionBMP");
/// 布局定义
var L = (function () {
    function L() {
    }
    return L;
}());
L.GAP_UNIFIED = 50;
__reflect(L.prototype, "L");
//# sourceMappingURL=DrawToTexture.js.map
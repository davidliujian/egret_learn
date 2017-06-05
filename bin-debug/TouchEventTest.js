var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TouchEventTest = (function (_super) {
    __extends(TouchEventTest, _super);
    function TouchEventTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TouchEventTest.prototype.onAddToStage = function (event) {
        this.drawText();
        var spr1 = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 80);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        this.addChild(spr1);
        //设置显示对象可以相应触摸事件
        spr1.touchEnabled = true;
        //注册事件
        spr1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaps, this, true); //useCapture:boolean — 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。
        //如果将 useCapture 设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。要在两个阶段都侦                                                                                  //听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次////将 useCapture 设置为 false。
        //结果：容器捕获侦听-》点击了spr1-》容器冒泡侦听
    };
    TouchEventTest.prototype.onTouch = function (evt) {
        this.txt.text += "\n点击了spr1";
    };
    TouchEventTest.prototype.onTouchTap = function (evt) {
        this.txt.text += "\n容器冒泡侦听\n---------";
    };
    TouchEventTest.prototype.onTouchTaps = function (evt) {
        this.txt.text += "\n容器捕获侦听";
    };
    TouchEventTest.prototype.drawText = function () {
        this.txt = new egret.TextField();
        this.txt.size = 18;
        this.txt.x = 250;
        this.txt.width = 200;
        this.txt.height = 200;
        this.txt.text = "事件文字";
        this.addChild(this.txt);
    };
    return TouchEventTest;
}(egret.DisplayObjectContainer));
__reflect(TouchEventTest.prototype, "TouchEventTest");
//# sourceMappingURL=TouchEventTest.js.map
/*
    有时我们会遇到随着时间推移循环调用回调函数的情况。比如完成动画或者特定的计算等。
    实现的方法有两种，注册侦听 ENTER_FRAME 事件和调用startTick全局函数。
    监听 ENTER_FRAME 将会按照帧频进行回调，而startTick一般以 60 帧回调。
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// class startTickerTest extends egret.DisplayObjectContainer {
//     public constructor() {
//         super();
//         this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
//     }
//    private star:egret.Bitmap;
//     //设置动画的移动速度
//     private speed:number = 0.05;
//     private timeOnEnterFrame = 0;
//     private onAddToStage(event:egret.Event) {
//         RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoad, this);
//         RES.loadConfig("resource/default.res.json", "resource/");
//         RES.loadGroup("preload");
//     }
//     private onLoad(event:egret.Event) {
//         var star:egret.Bitmap = new egret.Bitmap(RES.getRes("star_png"));
//         this.addChild(star);
//         this.star = star;
//         this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
//         this.timeOnEnterFrame = egret.getTimer();
//     }
//     private  onEnterFrame(e:egret.Event){
//             var now = egret.getTimer();
//             var time = this.timeOnEnterFrame;
//             var pass = now - time;
//             //console.log("onEnterFrame: ", (1000 / pass).toFixed(5),pass);
//             this.star.x += this.speed*pass;
//             this.timeOnEnterFrame = egret.getTimer();
//             if(this.star.x > 300)
//                 this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
//     }
// }
var startTickerTest = (function (_super) {
    __extends(startTickerTest, _super);
    function startTickerTest() {
        var _this = _super.call(this) || this;
        _this.speed = 0.05;
        _this.time = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    startTickerTest.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoad, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    };
    startTickerTest.prototype.onLoad = function (event) {
        var star = new egret.Bitmap(RES.getRes("star_png"));
        this.addChild(star);
        this.star = star;
        this.time = egret.getTimer();
        egret.startTick(this.moveStar, this);
    };
    startTickerTest.prototype.moveStar = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        console.log("moveStar: ", (1000 / pass).toFixed(5));
        this.star.x += this.speed * pass;
        if (this.star.x > 300)
            egret.stopTick(this.moveStar, this);
        this.time = now;
        return false; //需要注意的是，startTick函数的参数，
        //第一个参数即它的回调函数，要求有返回值，如果返回为true将在回调函数执行完成之后立即重绘，为false则不会重绘。另一个参数是this对象，通常传入this即可。    
    };
    return startTickerTest;
}(egret.DisplayObjectContainer));
__reflect(startTickerTest.prototype, "startTickerTest");
//# sourceMappingURL=StartTickerTest.js.map
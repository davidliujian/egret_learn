var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimerDemo = (function (_super) {
    __extends(TimerDemo, _super);
    function TimerDemo() {
        var _this = _super.call(this) || this;
        //创建一个计时器对象
        var timer = new egret.Timer(500, 5);
        //public Timer( delay:number,repeatCount:number )
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        //开始计时
        timer.start();
        return _this;
    }
    TimerDemo.prototype.timerFunc = function (e) {
        var timer = e.target;
        console.log("计时" + timer.currentCount);
    };
    TimerDemo.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    return TimerDemo;
}(egret.DisplayObjectContainer));
__reflect(TimerDemo.prototype, "TimerDemo");
//# sourceMappingURL=TimerDemo.js.map
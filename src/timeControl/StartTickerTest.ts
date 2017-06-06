/*
    有时我们会遇到随着时间推移循环调用回调函数的情况。比如完成动画或者特定的计算等。
    实现的方法有两种，注册侦听 ENTER_FRAME 事件和调用startTick全局函数。
    监听 ENTER_FRAME 将会按照帧频进行回调，而startTick一般以 60 帧回调。
*/

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

class startTickerTest extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoad, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    }

    private star:egret.Bitmap;
    private speed:number = 0.05;

    private time:number = 0;

    private onLoad(event:egret.Event) {
        var star:egret.Bitmap = new egret.Bitmap(RES.getRes("star_png"));
        this.addChild(star);
        this.star = star;
        this.time = egret.getTimer();
        egret.startTick(this.moveStar,this);
    }

    private moveStar(timeStamp:number):boolean {
        var now = timeStamp;
        var time = this.time;

        var pass = now - time;

        console.log("moveStar: ",(1000 / pass).toFixed(5));

        this.star.x += this.speed * pass;
        if(this.star.x > 300)
            egret.stopTick(this.moveStar,this);

        this.time = now;
        return false;//需要注意的是，startTick函数的参数，
                     //第一个参数即它的回调函数，要求有返回值，如果返回为true将在回调函数执行完成之后立即重绘，为false则不会重绘。另一个参数是this对象，通常传入this即可。    
    }

}
class TouchEventTest extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.drawText();
        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 80);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        this.addChild( spr1 );
        //设置显示对象可以相应触摸事件
        spr1.touchEnabled = true;
        //注册事件
        spr1.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaps, this, true);//useCapture:boolean — 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。
        //如果将 useCapture 设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。要在两个阶段都侦                                                                                  //听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次////将 useCapture 设置为 false。
        //结果：容器捕获侦听-》点击了spr1-》容器冒泡侦听
    }
    private onTouch( evt:egret.TouchEvent )
    {
        this.txt.text += "\n点击了spr1";
    }
    private onTouchTap( evt:egret.TouchEvent )
    {
        this.txt.text += "\n容器冒泡侦听\n---------";
    }
    private onTouchTaps( evt:egret.TouchEvent )
    {
        this.txt.text += "\n容器捕获侦听";
    }
    //绘制文本
    private  txt:egret.TextField;
    private drawText():void
    {
        this.txt = new egret.TextField();
        this.txt.size = 18;
        this.txt.x = 250;
        this.txt.width = 200;
        this.txt.height = 200;
        this.txt.text = "事件文字";
        this.addChild( this.txt );
    }
}
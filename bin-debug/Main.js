//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    //     test02   创建自己的显示对象类
    //     private onAddToStage(event: egret.Event) {
    //         //设置加载进度界面
    //         //Config to load process interface
    //         // this.loadingView = new LoadingUI();
    //         // this.stage.addChild(this.loadingView);
    //         var _myGrid:MyGrid = new MyGrid();
    //         var _myGrid2:MyGrid = new MyGrid();
    //         this.addChild( _myGrid2 );
    //          _myGrid.x=100;
    //           _myGrid.y=200;
    //         this.addChild( _myGrid );
    //    //     egret.Tween.get(_myGrid).to({x:100,y:100,scaleX:2, scaleY:2},500,egret.Ease.circIn);
    //         console.log(_myGrid.anchorOffsetX +"   "+ _myGrid.anchorOffsetY + "   "+ _myGrid.x+"   "+_myGrid.y);
    //         _myGrid.anchorOffsetX=50;
    //         _myGrid.x+=50;
    //         console.log(_myGrid.anchorOffsetX +"   "+ _myGrid.anchorOffsetY + "   "+ _myGrid.x+"   "+_myGrid.y);
    //         egret.Tween.get(_myGrid).to({rotation:60},500,egret.Ease.circIn).to({rotation:0},500,egret.Ease.circIn);
    //         //初始化Resource资源加载库
    //         //initiate Resource loading library
    //         // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    //         // RES.loadConfig("resource/default.res.json", "resource/");
    //     }
    //test03    改变相对于舞台的位置
    // private onAddToStage(event: egret.Event){
    //     var container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    //     container.x = 200;
    //     container.y =200;
    //     this.addChild(container);
    //     var circle:egret.Shape = new egret.Shape();
    //     circle.graphics.beginFill(0xff0000);
    //     circle.graphics.drawCircle(25,25,25);
    //     circle.graphics.endFill();
    //     container.addChild(circle);
    //     console.log(circle.x+"  "+circle.y);
    //     //给圆增加点击事件
    //     circle.touchEnabled = true;
    //     circle.addEventListener(egret.TouchEvent.TOUCH_TAP,onclick,this);
    //     function onclick():void{
    //         var targetPoint:egret.Point = circle.globalToLocal(0,0);
    //         circle.x = targetPoint.x;
    //         circle.y = targetPoint.y;
    //         console.log(container.width  +  "   " + container.height);
    //         console.log(circle.x+"  "+circle.y);
    //     }
    // }
    //test04 通过触摸移动显示对象
    // private onAddToStage(event: egret.Event){
    //     // let offsetX:number;
    //     // let offsetY:number;
    //     // let circle:egret.Shape = new egret.Shape();
    //     // circle.graphics.beginFill(0xff0000);
    //     // circle.graphics.drawCircle(25,25,25);
    //     // circle.graphics.endFill();
    //     // this.addChild(circle);
    //     // circle.touchEnabled = true;
    //     // circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startmove,this);
    //     // circle.addEventListener(egret.TouchEvent.TOUCH_END,endmove,this);
    //     // function startmove(e:egret.TouchEvent):void{
    //     //     offsetX = e.stageX - circle.x;
    //     //     offsetY = e.$stageY -circle.y;
    //     //     this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,move,this);
    //     // }
    //     // function move(e:egret.TouchEvent):void{
    //     //     circle.x = e.stageX - offsetX;
    //     //     circle.y = e.stageY - offsetY;
    //     // }
    //     // function endmove(e:egret.TouchEvent):void{
    //     //     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,move,this);
    //     // }
    //     //使拖动的对象始终出现在顶部
    //     //要拖拽的对象
    //     var draggedObject:egret.Shape;
    //     var offsetX:number;
    //     var offsetY:number;
    //     //画一个红色的圆
    //     var circle: egret.Shape = new egret.Shape();
    //     circle.graphics.beginFill(0xff0000);
    //     circle.graphics.drawCircle(25,25,25);
    //     circle.graphics.endFill();
    //     this.addChild(circle);
    //     //画一个蓝色的正方形
    //     var square:egret.Shape = new egret.Shape();
    //     square.graphics.beginFill(0x0000ff);
    //     square.graphics.drawRect(0,0,100,100);
    //     square.graphics.endFill();
    //     this.addChild(square);
    //     //增加圆形的触摸监听
    //     circle.touchEnabled = true;
    //     circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
    //     circle.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
    //     //增加正方形的触摸监听
    //     square.touchEnabled = true;
    //     square.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
    //     square.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
    //     function startMove(e:egret.TouchEvent):void{
    //         //把手指按到的对象记录下来
    //         draggedObject = e.currentTarget;
    //         //计算手指和要拖动的对象的距离
    //         offsetX = e.stageX - draggedObject.x;
    //         offsetY = e.stageY - draggedObject.y;
    //         //把触摸的对象放在显示列表的顶层
    //         this.addChild(draggedObject);
    //         //手指在屏幕上移动，会触发 onMove 方法
    //         this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
    //     }
    //     function stopMove(e:egret.TouchEvent) {console.log(22);
    //         //手指离开屏幕，移除手指移动的监听
    //         this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
    //     }
    //     function onMove(e:egret.TouchEvent):void{
    //         //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
    //         draggedObject.x = e.stageX - offsetX;
    //         draggedObject.y = e.stageY - offsetY;
    //     }
    // }
    //test05 平移 scrollRect 属性是 Rectangle 类的实例，通过更改 scrollRect 属性，可以使内容左右平移或上下滚动。
    //  private onAddToStage(event: egret.Event){
    //      var bigText:egret.TextField = new egret.TextField();
    //      bigText.text="平移和滚动显示对象,平移和滚动显示对象";
    //      bigText.scrollRect = new egret.Rectangle(0,0,200,50);
    //      bigText.cacheAsBitmap = true;
    //      this.addChild(bigText);
    //      console.log(bigText.width+"   "+bigText.height);
    //      var btnLeft:egret.Shape = new egret.Shape();
    //      btnLeft.graphics.beginFill(0xcccc01);
    //      btnLeft.graphics.drawRect(0,0,50,50);
    //      btnLeft.graphics.endFill();
    //      btnLeft.x=50;
    //      btnLeft.y=100;
    //      this.addChild(btnLeft);
    //      btnLeft.touchEnabled = true;
    //      btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
    //      var btnRight:egret.Shape = new egret.Shape();
    //      btnRight.graphics.beginFill(0x01cccc);
    //      btnRight.graphics.drawRect(0,0,50,50);
    //      btnRight.graphics.endFill();
    //      btnRight.x=150;
    //      btnRight.y=100;
    //      this.addChild(btnRight);
    //      btnRight.touchEnabled = true;
    //      btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
    //      function onScroll(e:egret.TouchEvent):void{
    //          var rect:egret.Rectangle = bigText.scrollRect;
    //          switch(e.currentTarget){
    //              case btnLeft:
    //                 rect.x+=20;
    //                 break;
    //             case btnRight:
    //                 rect.x-=20;
    //                 break;
    //          }
    //          bigText.scrollRect = rect;
    //      }
    // }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("heroes");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "heroes") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "heroes") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x336699);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        // var tx:egret.TextField = new egret.TextField();
        // tx.text = "I’m David, I will use Egret create a fantasy mobile game!";
        // tx.size = 32;
        // tx.x= 20;
        // tx.y=20;
        // tx.width = this.stage.stageWidth-40;
        // tx.$touchEnabled = true;
        // tx.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        // this.addChild(tx);
        var batman = new egret.Bitmap(RES.getRes("bg_jpg"));
        batman.x = 0;
        batman.y = 10;
        this.addChild(batman);
        var hero2 = new egret.Bitmap(RES.getRes("timg_jpg"));
        hero2.anchorOffsetY = 30;
        hero2.x = 70;
        hero2.y = 0;
        this.addChild(hero2);
        var hero3 = new egret.Bitmap(RES.getRes("hero3_jpg"));
        hero3.x = 170;
        hero3.y = 400;
        this.addChild(hero3);
        this.times = -1;
        var self = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            switch (++self.times % 5) {
                case 0:
                    egret.Tween.get(hero2).to({ x: hero3.x, y: hero3.y }, 300, egret.Ease.circIn);
                    egret.Tween.get(hero3).to({ x: hero2.x, y: hero2.y }, 300, egret.Ease.circIn);
                    var sound = RES.getRes("notify_mp3");
                    var channel = sound.play(0, 1);
                    break;
                case 1:
                    egret.Tween.get(hero3).to({ alpha: .3 }, 300, egret.Ease.circIn).to({ alpha: 1 }, 300, egret.Ease.circIn);
                    break;
                case 2:
                    egret.Tween.get(hero3).to({ scaleX: .4, scaleY: .4 }, 500, egret.Ease.circIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.circIn);
                    break;
                case 3:
                    egret.Tween.get(hero3).to({ rotation: 30 }, 500, egret.Ease.circIn).to({ rotation: 0 }, 500, egret.Ease.circIn);
                    break;
                case 4:
                    egret.Tween.get(hero3).to({ skewX: 10 }, 500, egret.Ease.circIn).to({ skewX: 0 }, 500, egret.Ease.circIn);
            }
        }, this);
        //常规网络通信
        console.log("createGameScene", RES.getRes("bg_jpg"));
        var urlreq = new egret.URLRequest("http://httpbin.org/user-agent");
        var urlloader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
        }, this);
        urlloader.load(urlreq);
        //使用websocket通信
        this.websocket = new egret.WebSocket();
        this.websocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.websocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.websocket.connect("echo.websocket.org", 80);
    };
    Main.prototype.touchHandler = function (e) {
        var tx = e.currentTarget;
        tx.textColor = 0x00ff00;
    };
    Main.prototype.onReceiveMessage = function (e) {
        var msg = this.websocket.readUTF();
        console.log("Receive message:" + msg);
    };
    Main.prototype.onSocketOpen = function () {
        var cmd = "Hello Egret WebSocket";
        console.log("The connection is successful, send data: " + cmd);
        this.websocket.writeUTF(cmd);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("heroes");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "heroes") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "heroes") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;
    private times:number;
    private websocket:egret.WebSocket;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x336699);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
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

        let batman:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
        batman.x=0;
        batman.y=10;
        this.addChild(batman);

        let hero2:egret.Bitmap = new egret.Bitmap(RES.getRes("timg_jpg"));
        hero2.anchorOffsetY =30;
        hero2.x=70;
        hero2.y=0;
        this.addChild(hero2);

        let hero3:egret.Bitmap = new egret.Bitmap(RES.getRes("hero3_jpg"));
        hero3.x=170;
        hero3.y=400;
        this.addChild(hero3);

        this.times=-1;
        var self = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            switch(++self.times%4){
                case 0:
                    egret.Tween.get( hero2 ).to( { x:hero3.x,y:hero3.y }, 300, egret.Ease.circIn );
                    egret.Tween.get( hero3 ).to( { x:hero2.x,y:hero2.y }, 300, egret.Ease.circIn );
                    var sound:egret.Sound = RES.getRes( "notify_mp3" ); 
                    var channel:egret.SoundChannel = sound.play(0,1);
                    break;
                case 1: 
                    egret.Tween.get( hero3 ).to( { alpha:.3 }, 300, egret.Ease.circIn ).to( { alpha:1 }, 300, egret.Ease.circIn );
                    break; 
                case 2: 
                    egret.Tween.get( hero3 ).to( { scaleX:.4, scaleY:.4 }, 500, egret.Ease.circIn ).to( { scaleX:1, scaleY:1 }, 500, egret.Ease.circIn );
                    break; 
                case 3:
                    egret.Tween.get(hero3).to({rotation:30},500,egret.Ease.circIn).to({rotation:0},500,egret.Ease.circIn);
            }
        },this);


        //常规网络通信
        console.log( "createGameScene", RES.getRes("bg_jpg") );
        var urlreq:egret.URLRequest = new egret.URLRequest("http://httpbin.org/user-agent" );
        var urlloader:egret.URLLoader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE,function(e:egret.Event):void{
            console.log(e.target.data);
        },this);
        urlloader.load(urlreq);

        //使用websocket通信
        this.websocket = new egret.WebSocket();
        this.websocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        this.websocket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        this.websocket.connect("echo.websocket.org",80);
    }

    private touchHandler(e:egret.TouchEvent){
        var tx:egret.TextField = e.currentTarget;
        tx.textColor = 0x00ff00;
    }

    private onReceiveMessage(e:egret.Event):void{
        var msg = this.websocket.readUTF();
        console.log("Receive message:"+msg);
    }

    private onSocketOpen():void{
        var cmd = "Hello Egret WebSocket";
        console.log("The connection is successful, send data: "+cmd);
        this.websocket.writeUTF(cmd);
    }

}



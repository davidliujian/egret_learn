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
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
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
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;
    private draggedObject:egret.Bitmap;
    private offsetX:number;
    private offsetY:number;
    private bullets:Array<Bullet>;
    private enemys:Array<Enemy>;
    private icon:egret.Bitmap;
    private _lastTime:number;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        //添加背景****************************************************
        let sky = this.createBitmapByName("bg1_png");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        //****************************************************添加背景
        
        //我方的飞机**************************************************        
        this.icon = this.createBitmapByName("plane2_png");
        this.addChild(this.icon);
        this.icon.anchorOffsetX = this.icon.width/2;
        this.icon.anchorOffsetY = this.icon.height/2;
        this.icon.x = stageW/2;
        this.icon.y = stageH*4/5;
        this.icon.scaleX=this.icon.scaleY=0.5;

        this.icon.touchEnabled =true;
        this.icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
        this.icon.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
        //**************************************************我方的飞机        


        //子弹**************************************************        
        this.bullets = new Array<Bullet>();

        var bullet = new Bullet();
        bullet.texture = RES.getRes("shot1_png");
        this.addChild(bullet);
        this.bullets.push(bullet);

        console.log("icon.x:"+this.icon.x + "    icon.y:"+this.icon.y+"   icon.anchorOffsetX:"+this.icon.anchorOffsetX);
        bullet.x =this.icon.x-15;
        bullet.y = this.icon.y-75;
        console.log("bullet.x:"+bullet.x + "    bullet.y:"+bullet.y +"  bullet.width:"+bullet.width);

        this.addEventListener( egret.Event.ENTER_FRAME, this.bulletAdd, this );
        //**************************************************子弹


        //敌机**************************************************
        this.enemys = new Array<Enemy>();
        var timer:egret.Timer = new egret.Timer(100);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        //开始计时
        timer.start();
        //**************************************************敌机
    }

    private bulletAdd(){
        var bullet = new Bullet();
        bullet.texture= RES.getRes("shot1_png");
        this.addChild(bullet);
        this.bullets.push(bullet);
        bullet.x =this.icon.x-1
        bullet.y = this.icon.y-75;

        //子弹是否超出舞台范围，超出就删除
        for( var i:number = this.bullets.length - 1; i > -1; --i ){
            var bullet:Bullet = this.bullets[i]; 
            var yTo:number =  bullet.y - bullet.speed
            if( yTo < 0){
                this.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
            }   
            bullet.y = yTo;
        }
    }



    //添加敌机
    private timerFunc(e:egret.Event)
    {
        var timer:egret.Timer =e.target;
        if(timer.currentCount % 5== 0 && timer.currentCount<=150){
            var enemy = new Enemy();
            enemy.texture= RES.getRes("enemy1_png");
            enemy.anchorOffsetX = enemy.width/2;
            enemy.anchorOffsetY = enemy.height/2;
            this.addChild(enemy);
            this.enemys.push(enemy);
            enemy.x =Math.random() * this.stage.stageWidth;
            enemy.y = 0;
            enemy.anchorOffsetX = enemy.width/2;
            enemy.anchorOffsetY  = enemy.height/2;
            enemy.scaleX=enemy.scaleY = 0.5;
            let ran:number = Math.random();
            enemy.speed = ran>0.3?ran *30 : 15;
            console.log("计时"+timer.currentCount);
        }
        
        //敌机是否超出舞台范围，超出就删除
        for( var i:number = this.enemys.length - 1; i > -1; --i ){
                var enemy:Enemy = this.enemys[i]; 
                var yTo:number =  enemy.y + enemy.speed;

                if( yTo > this.stage.stageHeight){
                    this.removeChild(this.enemys[i]);
                    this.enemys.splice(i,1);
                }   
                enemy.y = yTo;
        }

        this.hit(timer); //碰撞
        console.log(this.enemys.length+"    敌机数量"+timer.currentCount +"    次数");
        if(timer.currentCount > 150 && this.enemys.length == 0){
            this.removeEventListener( egret.Event.ENTER_FRAME, this.bulletAdd, this );
            // for(var i:number = this.bullets.length;i>-1;--i){
            //     this.removeChild(this.bullets[i]);
            // }
            timer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
            this.bullets.length=0;
            this.addChild(this.createGameOver());
        }
    }

    //是否碰撞
    private hit(timer:egret.Timer){
        for(var i=0;i<this.bullets.length;i++){
            var bullet = this.bullets[i];
            for(var j=0;j<this.enemys.length;j++){
                var enemy = this.enemys[j];
                var flag = this.hitTest(enemy,bullet) || this.hitTest(enemy,this.icon);
                if(flag){
                    if(this.hitTest(enemy,this.icon)){  //如果是我方飞机与敌机相撞
                        this.removeChild(this.icon);
                        this.removeEventListener( egret.Event.ENTER_FRAME, this.bulletAdd, this );
                        timer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
                        this.bullets.length=0;
                        this.addChild(this.createGameOver());
                    }
                    this.removeChild(bullet);
                    this.removeChild(enemy);
                    this.enemys.splice(j,1);
                    this.bullets.splice(i,1);
                    this.bomb(enemy);
                   
                }
            }
        }
    }

    //碰撞效果图的添加与删除
    private bomb(enemy:Enemy){
        var bomb = this.createBitmapByName("bomb_png");
        bomb.x = enemy.x;
        bomb.y = enemy.y;
        bomb.anchorOffsetX = bomb.width/2;
        bomb.anchorOffsetY = bomb.height/2;
        this.addChild(bomb);

        var timer1:egret.Timer = new egret.Timer(500,1);
                    timer1.addEventListener(egret.TimerEvent.TIMER,()=>{
                        this.removeChild(bomb);
                    },this);
        timer1.start();
    }

    //是否碰撞工具类
    private hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject){
        var isHit:boolean = obj1.hitTestPoint( obj2.x, obj2.y );
        return isHit;
    }
    // private hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean{

    //         var rect1:egret.Rectangle = obj1.getBounds();
    //         var rect2:egret.Rectangle = obj2.getBounds();
    //         rect1.x = obj1.x;
    //         rect1.y = obj1.y;
    //         rect2.x = obj2.x;
    //         rect2.y = obj2.y;
    //         return rect1.intersects(rect2);
    // }

    private startMove(e:egret.TouchEvent){
        //把手指按到的对象记录下来
            this.draggedObject = e.currentTarget;
            //计算手指和要拖动的对象的距离
            this.offsetX = e.stageX - this.draggedObject.x;
            this.offsetY = e.stageY - this.draggedObject.y;
            //把触摸的对象放在显示列表的顶层
            this.addChild(this.draggedObject);
            //手指在屏幕上移动，会触发 onMove 方法
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
    }

    private stopMove(e:egret.Event){
         this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
    }

    private onMove(e:egret.TouchEvent):void{
            //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
            if(e.stageX>0 && e.stageX < this.stage.stageWidth && e.stageY>0 && e.stageY<this.stage.stageHeight){
                this.draggedObject.x = e.stageX - this.offsetX;
                this.draggedObject.y = e.stageY - this.offsetY;
            }
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createGameOver():egret.TextField{
        var label:egret.TextField = new egret.TextField(); 
        label.text = "游戏结束！"; 

        label.x= this.stage.stageWidth/2;
        label.y= this.stage.stageHeight/2;
        label.anchorOffsetX = label.width/2;
        label.anchorOffsetY= label.height/2;
        return label;
    }
    
}

class Bullet extends egret.Bitmap{
    public speed:number = 40;
}

class Enemy extends egret.Bitmap{
    public  speed:number = 10;    
}
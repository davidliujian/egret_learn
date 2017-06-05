class GraphicsTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
//        this.addChild(this.drawBorderProgress());
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event)
    {
//         var shp:egret.Shape = new egret.Shape();
//         shp.graphics.lineStyle( 10, 0x00ff00 );
//         shp.graphics.beginFill( 0xff0000, 1);
//         shp.graphics.drawRect( 50, 50, 100, 200 );
//         shp.graphics.endFill();
// //        shp.graphics.clear();   //清空绘图
//         this.addChild( shp );

//         var shp1:egret.Shape = new egret.Shape();
//         shp1.graphics.lineStyle( 2, 0x00ff00 );
//         shp1.graphics.moveTo( 68, 84 );
//         shp1.graphics.lineTo( 167, 76 );
//         shp1.graphics.lineTo( 221, 118 );
//         shp1.graphics.lineTo( 290, 162 );``
//         shp1.graphics.lineTo( 297, 228 );
//         shp1.graphics.lineTo( 412, 250 );
//         shp1.graphics.lineTo( 443, 174 );
//         shp1.graphics.endFill();
//         this.addChild( shp1 );

//         //绘制曲线
//         var shp2:egret.Shape = new egret.Shape();
//         shp2.graphics.lineStyle( 2, 0x00ff00 );
//         shp2.graphics.moveTo( 350, 350);
//         shp2.graphics.curveTo( 400,400, 500,350);//使用当前线条样式和由 (controlX, controlY) 指定的控制点绘制一条从当前绘图位置开始到 (anchorX, anchorY) 结束的二次贝塞尔曲线
//         shp2.graphics.endFill();
//         this.addChild( shp2 );

        //绘制圆弧drawArc( x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean ):void
        // var shp3:egret.Shape = new egret.Shape();
        // shp3.graphics.lineStyle( 2, 0xddff00 );
        // shp3.graphics.drawArc(200,200,100,0,Math.PI/180 * 30,true);
        //  shp3.graphics.moveTo( 550, 550);
        // shp3.graphics.drawArc(100,200,100,0,Math.PI/180 * 30,false);
        // shp3.graphics.endFill();
        // this.addChild( shp3 );

        // //画扇形
        // var r:number = 50;
        // var shape:egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0xff0000);
        // shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
        // shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
        // shape.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180, false);//从起始点顺时针画弧到终点
        // shape.graphics.lineTo(r, r);//从终点画线到圆形。到此扇形的封闭区域形成
        // shape.graphics.endFill();
        // this.addChild(shape);
        
        //矩形遮罩
        // var shp:egret.Shape = new egret.Shape();
        // shp.graphics.beginFill( 0xff0000 );
        // shp.graphics.drawRect( 0,0,100,100);
        // shp.graphics.endFill();
        // shp.mask = new egret.Rectangle(20,20,30,50);
        // this.addChild( shp );
        // var shp2:egret.Shape = new egret.Shape();
        // shp2.graphics.beginFill( 0x00ff00 );
        // shp2.graphics.drawCircle( 0,0, 20);
        // shp2.graphics.endFill();
        // this.addChild( shp2 );
        // shp2.x = 20;
        // shp2.y = 20;

        //JSON方式分段设置文本样式
        var tx:egret.TextField = new egret.TextField;
        tx.width = 400;
        tx.x = 10;
        tx.y = 10;
        tx.textColor = 0;
        tx.size = 20;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.textFlow = <Array<egret.ITextElement>>[
            {text: "妈妈再也不用担心我在", style: {"size": 12}}
            , {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}}
            , {text: "里说一句话不能包含各种", style: {"fontFamily": "楷体"}}
            , {text: "五", style: {"textColor": 0xff0000}}
            , {text: "彩", style: {"textColor": 0x00ff00}}
            , {text: "缤", style: {"textColor": 0xf000f0}}
            , {text: "纷", style: {"textColor": 0x00ffff}}
            , {text: "、\n"}
            , {text: "大", style: {"size": 36}}
            , {text: "小", style: {"size": 6}}
            , {text: "不", style: {"size": 16}}
            , {text: "一", style: {"size": 24}}
            , {text: "、"}
            , {text: "格", style: {"italic": true, "textColor": 0x00ff00}}
            , {text: "式", style: {"size": 16, "textColor": 0xf000f0}}
            , {text: "各", style: {"italic": true, "textColor": 0xf06f00}}
            , {text: "样", style: {"fontFamily": "楷体"}}
            , {text: ""}
            , {text: "的文字了！"}
        ];
        this.addChild( tx );

        //  RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //  RES.loadConfig("resource/default.res.json", "resource/");
    }


    //画弧形进度条
    private getArcProgress():egret.Shape {
            var shape:egret.Shape = new egret.Shape();
            var angle:number = 0;
            egret.startTick(function (timeStamp:number):boolean {
                angle += 1;
                changeGraphics(angle);
                angle = angle % 360;
                return true;
            }, this);
            return shape;
            function changeGraphics(angle) {
                shape.graphics.clear();
                shape.graphics.lineStyle(2, 0x0000ff, 1);
                shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
                shape.graphics.endFill();
            }
        }

        //画扇形进度条
        private getSectorProgress():egret.Shape {
            var shape:egret.Shape = new egret.Shape();
            var angle:number = 0;
            egret.startTick(function (timeStamp:number):boolean {
                angle += 1;
                changeGraphics(angle);
                angle = angle % 360;
                return true;
            }, this);
            return shape;
            function changeGraphics(angle) {
                shape.graphics.clear();
                shape.graphics.beginFill(0xff0000);
                shape.graphics.moveTo(50, 50);
                shape.graphics.lineTo(100, 50);
                shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
                shape.graphics.lineTo(50, 50);
                shape.graphics.endFill();
            }
        }

        private onConfigComplete(event: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup("preload");
        }

         /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResourceLoadComplete(event: RES.ResourceEvent) {
            if (event.groupName == "preload") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.addChild(this.drawBorderProgress());
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

        //画不规则边框进度条
        private drawBorderProgress():egret.DisplayObjectContainer {
            var container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            var w:number = 100;
            var h:number = 100;
            var r:number = Math.max(w, h) / 2 * 1.5;
            var bitmap = new egret.Bitmap(RES.getRes("border_png"));
            console.log(bitmap);
            container.addChild(bitmap);
            bitmap.width = w;
            bitmap.height = h;
            var shape:egret.Shape = new egret.Shape();
            shape.x = bitmap.width / 2;
            shape.y = bitmap.height / 2;
            bitmap.mask = shape;
            container.addChild(shape);
            var angle = 0;
            egret.startTick(function (timeStamp:number):boolean {
                angle += 1;
                changeGraphics(angle);
                angle = angle % 360;
                return true;
            }, this);
            return container;
            function changeGraphics(angle) {
                shape.graphics.clear();
                shape.graphics.beginFill(0xff0000, 1);
                shape.graphics.lineTo(r, 0);
                shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
                shape.graphics.lineTo(0, 0);
                shape.graphics.endFill();
            }
        }
}
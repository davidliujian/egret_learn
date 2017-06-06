class BitmapTest extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    }
    private onGroupComp() {
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("border_png");
        img.width *= 3;
        img.x = 50;
        this.addChild(img);
        var img2:egret.Bitmap = new egret.Bitmap();
        img2.texture = RES.getRes("border_png");
        var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        img2.scale9Grid =rect;//在设置这样的九宫格参数后，我们再次拉伸我们的图像就不会发生变形的现象。
        img2.width *= 3;
        img2.x = 50;
        img2.y = 150;
        this.addChild(img2);

        var img3:egret.Bitmap = new egret.Bitmap();
        img3.texture=RES.getRes("egret_icon_png");
        img3.width*=2;
        img3.height*=3;
        img3.y=200;
        img3.fillMode = egret.BitmapFillMode.REPEAT;    //纹理的填充方式。默认是拉伸图片
        this.addChild(img3);

  //      var texture:egret.Texture = RES.getRes("run_png");
 //       texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));//裁剪指定区域并保存成图片。
    }
}
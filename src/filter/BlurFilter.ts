class BlurFilter extends egret.DisplayObjectContainer{
    /*
    可使用 BlurFilter 类将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。您可以生成一些模糊效果，
        范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
    */
    public constructor(){
        super();
       this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }

    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/assets/hero4.png" );
    }

    private imgLoadHandler( evt:egret.Event ):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;
        var img:egret.Bitmap = new egret.Bitmap(bmd);
        this.addChild(img);

        var blurFilter = new egret.BlurFilter(2,2);
        img.filters = [blurFilter];
    }
}
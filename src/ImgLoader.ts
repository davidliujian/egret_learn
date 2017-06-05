class ImgLoader extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoaderHandler,this);//添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听

        imgLoader.load("resource/assets/bg.jpg");
    }

    private imgLoaderHandler( evt:egret.Event ):void{
        var loader:egret.ImageLoader = evt.currentTarget;
        var bmd:egret.BitmapData = loader.data;
        var bmp:egret.Bitmap = new egret.Bitmap(bmd);

        this.addChild(bmp);
    }
}
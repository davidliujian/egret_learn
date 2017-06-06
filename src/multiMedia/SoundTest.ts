class SoundTest extends egret.DisplayObjectContainer{
    public constructor(){
        super();

        //  var sound:egret.Sound = new egret.Sound();
        // sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
        //     sound.play();
        // }, this);
        // sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
        //     console.log("loaded error!");
        // }, this);
        // sound.load("resource/assets/notify.mp3");

    // /    通过URL加载
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
            var sound:egret.Sound = loader.data;
            sound.play();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.load(new egret.URLRequest("resource/assets/notify.mp3"));


    }
}
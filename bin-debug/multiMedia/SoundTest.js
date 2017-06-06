var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SoundTest = (function (_super) {
    __extends(SoundTest, _super);
    function SoundTest() {
        var _this = _super.call(this) || this;
        //  var sound:egret.Sound = new egret.Sound();
        // sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
        //     sound.play();
        // }, this);
        // sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
        //     console.log("loaded error!");
        // }, this);
        // sound.load("resource/assets/notify.mp3");
        // /    通过URL加载
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            var sound = loader.data;
            sound.play();
        }, _this);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.load(new egret.URLRequest("resource/assets/notify.mp3"));
        return _this;
    }
    return SoundTest;
}(egret.DisplayObjectContainer));
__reflect(SoundTest.prototype, "SoundTest");
//# sourceMappingURL=SoundTest.js.map

var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/BitmapTest.js",
	"bin-debug/Boy.js",
	"bin-debug/DateEvent.js",
	"bin-debug/DrawToTexture.js",
	"bin-debug/filter/BlurFilter.js",
	"bin-debug/filter/ColorMatrixFilter.js",
	"bin-debug/filter/DropShadowFilter.js",
	"bin-debug/filter/GlowFilter.js",
	"bin-debug/GeolocationTest.js",
	"bin-debug/Girl.js",
	"bin-debug/GraphicsTest.js",
	"bin-debug/HitTest.js",
	"bin-debug/HTTPdemo.js",
	"bin-debug/ImgLoader.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/multiMedia/SoundTest.js",
	"bin-debug/MyGrid.js",
	"bin-debug/SampleDate.js",
	"bin-debug/TextEventDemo.js",
	"bin-debug/timeControl/StartTickerTest.js",
	"bin-debug/timeControl/TimerDemo.js",
	"bin-debug/TouchEventTest.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "GeolocationTest",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: true,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: fasle,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
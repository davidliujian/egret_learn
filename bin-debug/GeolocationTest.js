var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 获取地理位置信息并显示出来
 */
var GeolocationTest = (function (_super) {
    __extends(GeolocationTest, _super);
    function GeolocationTest() {
        var _this = _super.call(this) || this;
        //显示信息的label
        _this.label = new egret.TextField();
        _this.label.x = 150;
        _this.addChild(_this.label);
        _this.label.size = 20;
        _this.label.text = "暂未获取到经纬度信息";
        _this.label.anchorOffsetX = _this.label.width / 2;
        var gps = new egret.Geolocation();
        //监听经纬度变化的事件
        gps.addEventListener(egret.Event.CHANGE, _this.onGotLocation, _this);
        //监听用户拒绝事件
        gps.once(egret.GeolocationEvent.PERMISSION_DENIED, _this.userDenied, _this);
        //监听失败事件
        gps.addEventListener(egret.GeolocationEvent.UNAVAILABLE, _this.unAvailable, _this);
        //开始监听变化
        gps.start();
        return _this;
    }
    GeolocationTest.prototype.onGotLocation = function (e) {
        this.label.text = "纬度: " + e.latitude.toFixed(4) +
            " 海拔: " + e.altitude +
            "n经度:" + e.longitude.toFixed(4)
            + " 速度: " + e.speed;
        this.label.anchorOffsetX = this.label.width / 2;
    };
    GeolocationTest.prototype.userDenied = function (e) {
        this.label.text = "用户拒绝访问位置信息，获取位置信息失败";
        this.label.anchorOffsetX = this.label.width / 2;
    };
    GeolocationTest.prototype.unAvailable = function (e) {
        this.label.text = "获取位置信息失败: " + e.errorMessage + "n"
            + "错误类型: " + e.errorType;
        this.label.anchorOffsetX = this.label.width / 2;
    };
    return GeolocationTest;
}(egret.DisplayObjectContainer));
__reflect(GeolocationTest.prototype, "GeolocationTest");
//# sourceMappingURL=GeolocationTest.js.map
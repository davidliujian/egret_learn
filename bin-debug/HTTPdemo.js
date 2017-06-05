var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPdemo = (function (_super) {
    __extends(HTTPdemo, _super);
    function HTTPdemo() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //test01
    //       private onAddToStage(event:egret.Event){
    //         var request = new egret.HttpRequest();
    //         request.responseType = egret.HttpResponseType.TEXT;
    // //    var params = "?p1=getP1&p2=getP2";
    //   //      request.open("php/get_test.php"+params,egret.HttpMethod.GET);
    //   //        request.send();
    // //  var params = "p1=postP1&p2=postP2";
    // //  request.open("php/post_test.php",egret.HttpMethod.POST);
    // //设置响应头
    // //  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // //发送参数
    // //  request.send(params);
    //         request.open("http://httpbin.org/get",egret.HttpMethod.GET);
    //         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //         request.send();
    //         request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
    //         request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
    //         request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    //     }
    //test02
    HTTPdemo.prototype.onAddToStage = function (event) {
        //加载文本
        var url = "resource/config/description.json";
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log("respHandler:n", request.response);
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        };
        var progressHandler = function (evt) {
            console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
        };
        request.once(egret.Event.COMPLETE, respHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
        request.once(egret.ProgressEvent.PROGRESS, progressHandler, null);
        request.open(url, egret.HttpMethod.GET);
        request.send();
        //加载二进制
        var url = "resource/assets/egret_icon.png";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var ab = request.response;
                    console.log("respHandler:n", ab.byteLength);
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    };
    HTTPdemo.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
    };
    HTTPdemo.prototype.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    HTTPdemo.prototype.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return HTTPdemo;
}(egret.DisplayObjectContainer));
__reflect(HTTPdemo.prototype, "HTTPdemo");
//# sourceMappingURL=HTTPdemo.js.map
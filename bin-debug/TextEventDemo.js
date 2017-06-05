var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var textEventDemo = (function (_super) {
    __extends(textEventDemo, _super);
    function textEventDemo() {
        var _this = _super.call(this) || this;
        //文本超链接事件
        // var tx:egret.TextField = new egret.TextField;
        // tx.textFlow = new Array<egret.ITextElement>(
        //    // { text:"这段文字有链接", style: { "href" : "event:www.baidu.com" } }//以 event: 开头，后边跟随一个字符串，用于输出相应的文字或用于识别包含该链接的文字段。
        //                                                                         //然后侦听 TextEvent.LINK 事件，在事件处理函数中通过事件对象的 text 属性来获取该段文字所设置的字符串。
        //      { text:"这段文字有链接", style: { "href" : "http://www.baidu.com" } }//将上面的 href 对应的字符串修改为 url 即可打开相应的 url。
        //     ,{ text:"\n这段文字没链接", style: {} }
        // );
        // tx.touchEnabled = true;
        // tx.addEventListener( egret.TextEvent.LINK, function( evt:egret.TextEvent ){
        //     console.log( evt.text );
        // }, this );
        // tx.x = 10;
        // tx.y = 90;
        // this.addChild( tx );
        var text = new egret.TextField();
        text.type = egret.TextFieldType.INPUT;
        //设置输入文本的样式为文本
        text.inputType = egret.TextFieldInputType.TEXT;
        text.text = "输入文本:";
        text.width = 300;
        _this.addChild(text);
        var pass = new egret.TextField();
        pass.type = egret.TextFieldType.INPUT;
        //设置输入文本显示为密码
        pass.inputType = egret.TextFieldInputType.PASSWORD;
        //设置密码显示
        pass.displayAsPassword = true;
        pass.text = "输入密码:";
        pass.y = 100;
        pass.width = 300;
        _this.addChild(pass);
        var tel = new egret.TextField();
        tel.type = egret.TextFieldType.INPUT;
        //设置输入电话号样式
        tel.inputType = egret.TextFieldInputType.TEL;
        tel.text = "输入电话号:";
        tel.y = 200;
        tel.width = 300;
        _this.addChild(tel);
        var txInput = new egret.TextField;
        txInput.type = egret.TextFieldType.INPUT;
        txInput.width = 282;
        txInput.height = 43;
        txInput.x = 134;
        txInput.y = 592;
        txInput.textColor = 0x000000;
        _this.layTxBg(txInput);
        _this.addChild(txInput); //添加背景的代码需要放在添加文本的代码之前，以使背景处于文本之下：
        var button = new egret.Shape();
        button.graphics.beginFill(0x00cc00);
        button.graphics.drawRect(0, 0, 100, 40);
        button.graphics.endFill();
        button.y = 550;
        _this.addChild(button);
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            txInput.setFocus();
        }, _this);
        return _this;
    }
    //背景
    textEventDemo.prototype.layTxBg = function (tx) {
        var shp = new egret.Shape;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(tx.x, tx.y, tx.width, tx.height);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    return textEventDemo;
}(egret.DisplayObjectContainer));
__reflect(textEventDemo.prototype, "textEventDemo");
//# sourceMappingURL=TextEventDemo.js.map
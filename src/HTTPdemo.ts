class HTTPdemo extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
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
       private onAddToStage(event:egret.Event){

           //加载文本
            var url = "resource/config/description.json";
            var  request:egret.HttpRequest = new egret.HttpRequest();
            var respHandler = function( evt:egret.Event ):void{
                switch ( evt.type ){
                    case egret.Event.COMPLETE:
                        var request:egret.HttpRequest = evt.currentTarget;
                        console.log( "respHandler:n", request.response );
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        console.log( "respHandler io error" );
                        break;
                }
            }
            var progressHandler = function( evt:egret.ProgressEvent ):void{
                console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
            }
            request.once( egret.Event.COMPLETE, respHandler, null);
            request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
            request.once( egret.ProgressEvent.PROGRESS, progressHandler, null);
            request.open( url, egret.HttpMethod.GET ); 
            request.send( );


            //加载二进制
            var url = "resource/assets/egret_icon.png";
            var  request:egret.HttpRequest = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            var respHandler = function( evt:egret.Event ):void {
            switch ( evt.type ){
                case egret.Event.COMPLETE:
                    var request:egret.HttpRequest = evt.currentTarget;
                    var ab:ArrayBuffer = request.response;
                    console.log( "respHandler:n", ab.byteLength );
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log( "respHandler io error" );
                    break;
            }
            }
            request.once( egret.Event.COMPLETE, respHandler, null);
            request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
            request.open( url, egret.HttpMethod.GET );
            request.send( );
       }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
    }

    private onGetIOError(event:egret.IOErrorEvent):void {
         console.log("get error : " + event);
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}
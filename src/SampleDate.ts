class SampleDate extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        var boy:Boy = new Boy();
        boy.name = "男朋友";

        var girl :Girl = new Girl();
        girl.name = "女朋友";

        //注册侦听器
        boy.addEventListener(DateEvent.DATE,girl.getDate,girl);
        ////男朋友发送要求
        boy.order();
        //移除
        boy.removeEventListener(DateEvent.DATE,girl.getDate,girl);
    }
} 
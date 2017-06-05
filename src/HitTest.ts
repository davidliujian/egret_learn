class HitTest extends egret.DisplayObjectContainer
{
   public constructor()
   {
       super();
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
   }
   private onAddToStage(event:egret.Event)
   {
       this.drawText();
       var shp:egret.Shape = new egret.Shape();
       shp.graphics.beginFill( 0xff0000 );
       shp.graphics.drawCircle( 0,0,20);
       shp.graphics.endFill();
       shp.width = 100;
       shp.height = 100;
       this.addChild( shp );
       var isHit:boolean = shp.hitTestPoint( 25, 25,true );
       this.infoText.text = "碰撞结果" + isHit;
   }
   private infoText:egret.TextField;
   private drawText()
   {
       this.infoText = new egret.TextField();
       this.infoText.y = 200;
       this.infoText.text = "碰撞结果";
       this.addChild( this.infoText );
   }
}
class MyGrid extends egret.Shape{
//class GridSprite extends egret.Sprite //继承自Sprite,就是自定义一个容器，可以在里面添加子对象，而继承自Shape不行
    public constructor(){
        super();
        this.drawGrid();
    }

    private drawGrid(){
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0,0,50,50);
        this.graphics.drawRect(50,50,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0,50,50,50);
        this.graphics.drawRect(50,0,50,50);
        this.graphics.endFill();
    }

    
}
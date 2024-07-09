class Bullet1
  {
    constructor(x,y)
    {
      this.y = y;
      this.x = x;
    }
    move()
    {
      this.y -= 2;
    }
    
    display()
    {
      fill("black");
      circle(this.x,this.y,10);
    }
  }
    
    
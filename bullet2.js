class Bullet2
  {
    constructor(x,y)
    {
      this.x = x;
      this.y = y;      
    }
    move()
    {
      this.y += 2;
      
    }
    
    display()
    {
      fill("white");
      circle(this.x,this.y, 10);
    }
  }
    
    
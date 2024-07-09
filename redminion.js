class Rminion
  {
    constructor(x,y,xSpeed,ySpeed)
    {
      this.y = y;
      this.x = x;
    }
    move()
    {

    }
    
    display()
    {
      strokeWeight(3);
      fill("red");
      circle(this.x,this.y,30);
      fill("gray")
      rect(this.x - 20, this.y- 10, 5, 30);
    }
    
    
    
    
  }
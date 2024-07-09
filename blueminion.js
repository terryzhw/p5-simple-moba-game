class Bminion
  {
    constructor(x,y)
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
      fill("rgb(0,155,255)");
      circle(this.x,this.y,30);
      fill("gray")
      rect(this.x + 15, this.y- 20, 5, 30);
    }
    
    
    
    
  }
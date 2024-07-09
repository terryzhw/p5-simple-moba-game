/* Create a multiplayer online battle arena with a top-down perspective.
Try to implement a 2d tile map for the ground.
The objective is for each player to destroy their opponents main structure located
at the opposite sides of the battlefield. Each player will be assisted by AI units that
spawn in groups towards the enemy's base which is heavily guarded by defensive
structures.
It would be cool to have different resources that the players can manage.
It would also be cool if the player's abilities improved over time.
*/

var player1x = 180;
var player1y = 70;
var whichCanvas = 1;
var player2x = 180;
var player2y = 435;
var cooldown = 0;
var blueminion_amount = 0;
var redminion_amount = 0;
var redGolder = 0;
var blueGolder = 0;
var redGolder2 = 0;
var blueGolder2 = 0;
var redGoldReq = 5;
var blueGoldReq = 5;
var blueBullet = 0;
var redBullet = 0;
var redHealth = 5;
var blueHealth = 5;
var blueNexusX = 170;
var redNexusX = 170;
var blueNexusXSpeed = 1;
var redNexusXSpeed = 1;


var gameEnd = false;
var redDead = false;
var blueDead= false;

var bluechar_health = 3;
var redchar_health = 3;



let blue_minion=[];
let red_minion=[];
let bullet1=[];
let bullet2=[];


var bulletHit = false;
var ammo1 = 0;
var ammo2 = 0;

function preload()
{

  myFont = loadFont("Game Of Squids.ttf");
  myFont1 = loadFont("nasalization-rg.otf");
  
}

function increment() 
{
  if (ammo1 <= blueBullet)
  {
    ammo1 += 1;
  }
  if (ammo2 <= redBullet)
  {
    ammo2 += 1;
  }
  

}

function setup() {
  startButton = createButton("Play");
  startButton.mousePressed(start);
  startButton.position(180,250);
  startButton.style('textFont', myFont);
  
  backButton = createButton("Back");
  backButton.mousePressed(back);
  backButton.position(180,270);
  backButton.style('textFont', myFont);
  
  instructButton = createButton("Instructions");
  instructButton.mousePressed(instruction);
  instructButton.position(161,280);
  instructButton.style('textFont', myFont);
  
  setInterval(increment, 1000);
  setInterval(increment1, 5000);
  
  nexus1 = loadImage('nexus.jpg');
  nexus2 = loadImage('nexus.jpg');
  player1 = loadImage('player1.png');
  player2 = loadImage('player2.png');

  
}

function start()
{
  if (whichCanvas == 1)
  {
    whichCanvas += 1;
  }
}
function back()
{
  if (whichCanvas == 3)
  {
    whichCanvas -= 2;
  }
}
function instruction()
{
  if (whichCanvas == 1)
  {
    whichCanvas += 2;
  }
}

function draw() {
  if(whichCanvas == 1)
  {
    canvas1();
  }
  if (whichCanvas == 2)
  {
    canvas2();

  } 
  if (whichCanvas == 3)
  {
    canvas3();

  } 

}

function canvas1()
{
  createCanvas(400, 400);
  instructButton.show()
  backButton.hide();
  startButton.show();
  background("gray");
  textFont(myFont);
  textSize(50);
  fill("white");
  text("Luminary", 60, 200)
  
}

function increment3()
{
  redDead = false;
  bluechar_health += 3;
}
function increment4()
{
  blueDead = false;
  redchar_health += 3;
}


function canvas2()
{
  
  createCanvas(400, 540);
  instructButton.hide()
  backButton.hide();
  startButton.hide();
  background('lightgreen');
  push();
  fill("gold")
  rect(180, 260, 30, 30 ,10);
  pop();
  

  
  push();
  fill("red")
  rect(330, 10, 50, 50, 10)
  text(redHealth, 100, 50);
  text(blueHealth, 100, 520);
  pop();
  
  push();
  
  fill("blue");
  rect(330, 480, 50, 50, 10);
  pop();
  
  push();
  textSize(30);
  fill("gold")
  text(redGoldReq, 340, 45);
  text(blueGoldReq, 340, 515);
  pop();
  
  

  
  
  
  
  
  
  
  textFont(myFont1)
  text(ammo1, 250, 520);
  text(ammo2 , 250, 50);
  var blueGold = dist(player2x, player2y, 180, 260);
  var redGold = dist(player1x, player1y, 180, 260);
  var blueShop = dist(player2x, player2y, 330, 480);
  var redShop = dist(player1x, player1y, 330, 10);
  
  blueNexusX += blueNexusXSpeed
  if (blueNexusX > 350)
    {
      blueNexusXSpeed *= -1
    }
  else if (blueNexusX < 0)
  {
      blueNexusXSpeed *= -1
  }
  
  
  redNexusX -= redNexusXSpeed
  if (redNexusX > 350)
    {
      redNexusXSpeed *= -1
    }
  else if (redNexusX < 0)
  {
      redNexusXSpeed *= -1
  }
  
  
  
  
    if (blueShop < 50 && blueShop < 50 && blueGolder >= blueGoldReq)
    {
      blueGolder -= blueGoldReq;
      blueGoldReq += 5;
      blueBullet += 1;
    }
  if (redShop < 50 && redShop < 50 && redGolder >= redGoldReq)
    {
      redGolder -= redGoldReq;
      redGoldReq += 5;
      redBullet += 1;

    }
  
  
  if (blueGold < 30 && blueGold < 30 && gameEnd == false)
    {
      blueGolder += 0.02;
    }
  if (redGold < 30 && redGold < 30 && gameEnd == false)
    {
      redGolder += 0.02;
    }
  
  push();
  fill("gold")
  blueGolder2 = round(blueGolder);
  redGolder2 = round(redGolder);
  text(blueGolder2, 10, 520);
  text(redGolder2, 10, 50);
  pop();
  

  
  
  
  for(let m=0;m<bullet1.length;m++)
    {
      bullet1[m].move();
      bullet1[m].display();
      
      var redNexusShot = dist(bullet1[m].x, bullet1[m].y, redNexusX, 10);
      if (redNexusShot < 50 && redNexusShot < 50 && redminion_amount <=0)
        {
          redHealth -= 1;
          bullet1.splice(m,1);
          break;
        }
      
      var blueCharShot = dist(bullet1[m].x, bullet1[m].y, player1x, player1y)
      if (blueCharShot < 30)
        {
          bluechar_health -= 1;
          bullet1.splice(m,1);
          break;
        }
      
      
        for(let n=0;n<red_minion.length;n++)
    {
      var redMinionShot = dist(bullet1[m].x,bullet1[m].y, red_minion[n].x,red_minion[n].y);
      if(redMinionShot<30)
      {

        redminion_amount -= 1;
        red_minion.splice(n,1);
        bullet1.splice(m,1);
        break;
      }

    }
    }
  
  
  for(let m=0;m<bullet2.length;m++)
    {
      bullet2[m].move();
      bullet2[m].display();
      
      var blueNexusShot = dist(bullet2[m].x, bullet2[m].y, blueNexusX, 480);
      if (blueNexusShot < 50 && blueNexusShot < 50 && blueminion_amount <= 0)
        {
          blueHealth -= 1;
          bullet2.splice(m,1);
          break;
        }
      var redCharShot = dist(bullet2[m].x, bullet2[m].y, player2x, player2y)
      if (redCharShot < 30)
        {
          redchar_health -= 1;
          bullet2.splice(m,1);
          break;
        }
      
      
      for(let n=0;n<blue_minion.length;n++)
    {
      var blueMinionShot = dist(bullet2[m].x,bullet2[m].y, blue_minion[n].x,blue_minion[n].y);
      if(blueMinionShot<30)
      {
        blueminion_amount -= 1;
        blue_minion.splice(n,1);
        bullet2.splice(m,1);
        break;
      }

    }
    }
  
  if (redHealth <= 0)
    {
      push();
      fill("blue");
      text("Blue Wins!", 60, 280);     
      pop();
      gameEnd = true;
    }
  if (blueHealth <= 0)
    {
      push();
      fill("red");
      text("Red Wins!", 70, 280);
      pop();
      gameEnd = true;
    }
  
  
  
  
  for(let m=0;m<red_minion.length;m++)
    {
      //red_minion[m].move();
      red_minion[m].display();
      if (red_minion[m].y > 200)
        {
            //bullet2.push(new Bullet2(red_minion[m].x-17, red_minion[m].y+ 25));
          
            
        }
      else
        {
          red_minion[m].y += 1;
        }
    }
  
  for(let m=0;m<blue_minion.length;m++)
    {
      blue_minion[m].move();
      blue_minion[m].display();
      if(blue_minion[m].y < 350)
        {
           //bullet1.push(new Bullet1(blue_minion[m].x+17, blue_minion[m].y-25));
        }
      else
      {
        blue_minion[m].y -= 1
      }
    }
  image(nexus1, redNexusX, 10, 50, 50);
  image(nexus2, blueNexusX, 480, 50, 50);  
  image(player1, player1x, player1y, 30, 35);
  image(player2, player2x, player2y, 30, 35);
  
    if(bluechar_health <=0 )
    {
      player1x = 180;
      player1y = 70;
      redDead = true;
      setInterval(increment3, 5000);
      rect(player1x, player1y+10, 30, 10);
    }
  
    if(redchar_health <=0 )
    {
      player2x = 180;
      player2y = 435;
      blueDead = true;
      setInterval(increment4, 5000);
      rect(player2x, player2y+15, 30, 10);
    }
  

      
      
  //player 1 controls
  if(keyIsPressed && keyCode == 83 && redDead == false && gameEnd == false)
    {
      player1y += 2;
    }
  else if(keyIsPressed && keyCode == 65 && redDead == false && gameEnd == false)
    {
      player1x -= 2;
    }
  else if(keyIsPressed && keyCode == 68 && redDead == false && gameEnd == false)
    {
      player1x += 2;
    }
  else if(keyIsPressed && keyCode == 87 && redDead == false && gameEnd == false)
    {
      player1y -= 2;
    }
  
    //player 2 controls
  if(keyIsPressed && keyCode == 40 && blueDead == false && gameEnd == false)
    {
      player2y += 2;
    }
  else if(keyIsPressed && keyCode == 37 && blueDead == false && gameEnd == false)
    {
      player2x -= 2;
    }
  else if(keyIsPressed && keyCode == 39 && blueDead == false && gameEnd == false)
    {
      player2x += 2;
    }
  else if(keyIsPressed && keyCode == 38 && blueDead == false && gameEnd == false)
    {
      player2y -= 2;
    }
}






function keyPressed()
{
  if(keyCode == 81 && ammo2 > 0 && gameEnd == false)
  {
    bullet2.push(new Bullet2(player1x+15, player1y+30));
    ammo2 -= 1;
  }
  if(keyCode == 32 && ammo1 > 0 && gameEnd == false)
  {
    bullet1.push(new Bullet1(player2x+15, player2y));
    ammo1 -= 1;
  }
}

function increment1()
{
  if(redminion_amount < 3 && gameEnd == false)
    {
      red_minion.push(new Rminion(random(100, 300), 10));
      redminion_amount += 1;
    }
  if(blueminion_amount < 3 && gameEnd == false)
    {
      blue_minion.push(new Bminion(random(100, 300), 480));
      blueminion_amount += 1;
    }

}
function canvas3()
{
  createCanvas(400, 400);
  background("black");
  textFont(myFont1);
  textSize(20);
  text("Instructions:", 130, 50);
  textSize(15);
  text("The way to win this game \n is to destroy \n the enemy structure. \n Player 1 Controls: WASD to Move, \nQ to Shoot. \n Player 2 Controls: Arrow Keys, \n Space to Shoot", 70, 100)
  
  instructButton.hide()
  startButton.hide();
  backButton.show();
}


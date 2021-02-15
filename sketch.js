var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var points=0
var survivalTime=0;
var monkey ,jumpSound, monkey_running,background1,backgroundImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground,ground2,grassImage;
var gameOver,restart,gameoverImage,restartImage;
var sound;
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  sound=loadSound("Sound.mp3")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 grassImage=loadImage("grass.png");
  backgroundImage=loadImage("nature.jpg");
  restartImage=loadImage("restart.png");
  gameoverImage=loadImage("gameover.png");
  jumpSound=loadSound("jump.mp3");
}



function setup() {
  createCanvas(800,400);
  sound.loop();
   background1=createSprite(300,100,600,200);
  background1.addImage("background",backgroundImage);
  background1.scale=5.5;
 // ground.velocityX=-3;
  
  monkey=createSprite(100,180,1,1);
  monkey.addAnimation("MRun",monkey_running);
  monkey.scale=0.18
  monkey.setCollider("rectangle",1,1,monkey.width,monkey.height);
  monkey.debug=false;
  
  ground=createSprite(300,398,800,10);
   ground.x=ground.width/2;
  ground.visible=false;
  
  
  ground2=createSprite(300,385,800,15);
  ground2.addImage(grassImage);
  ground2.scale=2;
  
  gameOver=createSprite(350,150,1,1);
  gameOver.addImage(gameoverImage);
  gameOver.scale=1;
  gameOver.visible=false
  restart=createSprite(350,290,50,50);
  restart.addImage(restartImage);
  restart.scale=1;
  restart.visible=false
 obstaclesGroup= createGroup();
  foodGroup= createGroup();
     score=0;  
}


function draw() {
background(22,33,66);
  monkey.collide(ground);
  background1.velocityX=-3;
 ground.velocityX=-3;
  
  ground.velocityX=-(4+ score/10);
    if(gameState===PLAY){
   
  switch(points){
        case 10: monkey.scale=0.10;
                break;
        case 20: monkey.scale=0.12;
                break;
        case 30: monkey.scale=0.14;
                break;
        case 40: monkey.scale=0.16;
                break;
     
        default: break;
    }
    
    if (background1.x<70) {
      background1.x=background1.width/2;
  }
  if (ground.x < 70){
      ground.x = ground.width/2;
    }
  if (keyDown("space")&& monkey.y>=80){
    monkey.velocityY=-14;
     jumpSound.play();
  }
  restart.visible=false;
    monkey.visible=true;
    background1.visible=true;
    ground2.visible=true;
    gameOver.visible=false;
     //adding gravity
   monkey.velocityY = monkey.velocityY + 1
   score = score + Math.round(getFrameRate()/60);
   if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    points=points+1;
  }
    if (obstaclesGroup.isTouching(monkey)){
     gameState=END;
    }
    }
     if(gameState===END){
      background1.velocityX=0;
      monkey.visible=false

      foodGroup.destroyEach()
      obstaclesGroup.destroyEach()
      gameOver.visible=true;
    restart.visible=true;

    if(mousePressedOver(restart)){
      restart2();
    }
    }

  
  drawSprites();
  spawnObstacle();
  spawnFood();
  //giving score
  fill(33,65,104)
  strokeWeight(5)
  stroke(7,1,203);
  textSize(20);
  text("Score : "+score,10,25)

  fill(53,105,204)
  strokeWeight(5)
  stroke(207,300,203);
  textSize(20);
  text("Bananas : "+points,300,25)
  
  //giving survival time
 stroke(77,81,203);
  textSize(20);
  fill(0);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,530,25);
}

function restart2(){
  gameState=PLAY;
  score=0
  background1.velocityX=-3;
}

function spawnObstacle(){
  if (frameCount % 120 === 0){
     var obstacle = createSprite(840,160,10,10);
     obstacle.y = Math.round(random(370,370));
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(6 + points/10);
    obstacle.scale=0.15;
    //giving lifetime to obstacle
    obstacle.lifetime=200;
    //giving depth to obstacles 
    obstacle.depth = ground2.depth;
   ground2.depth = ground2.depth +1;
   obstaclesGroup.add(obstacle);
  }
}
  function reset(){
  gameState=PLAY
     score=0;
    
   }
 function spawnFood(){
   if (frameCount % 180 === 0){
   var banana=createSprite(840,130,10,10);
   banana.y=Math.round(random(200,200));
   banana.addImage(bananaImage);
   banana.velocityX=-(6+points/10);
     banana.scale=0.06;
   banana.lifetime=200;
     foodGroup.add(banana);
   }
 }





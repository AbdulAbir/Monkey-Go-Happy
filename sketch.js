var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,groundImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var obstacle,obstacleImage;
var foodGroup;
var obstacleGroup;
var gameOver,restart;
var gameOverImg,restartImg;
var sound;

var survivalTime = 0;

var monkeyEaten = 0;
var groundInvisidle;

var jumpSound,gameOvervarSound,eatSound;

function preload(){
  
  groundImage = loadImage("IMG-20200910-WA0000.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 
  
  bananaImage = loadImage("banana.png");
  obstalceImage = loadImage("obstacle.png");
  
  restartImg = loadImage("restarts.png")
  gameOverImg = loadImage("gameover.png")
  
  sound = loadSound("Abir monkey game sound.mp3")
 
  jumpSound = loadSound("jump.mp3");
  gameOvervarSound = loadSound("Retro-game-over-sound-effect.mp3");
  eatSound = loadSound("Minecraft-eat2.mp3");
 
}



function setup()
{
   createCanvas(600,330)
  
   ground= createSprite(200,165,0,0);
   ground.addAnimation("runnin gr",  groundImage);
   ground.scale = 0.8;
   ground.x = ground.width /3;
  
   monkey = createSprite(50,300,20,20);
   monkey.addAnimation("running", monkey_running);
   monkey.scale = 0.1
  
   groundInvisidle = createSprite(20,330,110,10);
  
   gameOver = createSprite(300,100);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 2;
  
   restart = createSprite(300,200);
   restart.addImage(restartImg);
   restart.scale = 0.4;
   
   foodGroup = new Group();
   obstacleGroup = new Group();
  
  // sound.play();
  
  monkey.setCollider("circle",0,0,250);
   //monkey.debug = true
}


function draw() 
{
  background("white");
 
  if(gameState === PLAY)
  {
  if(keyDown("space") && monkey.y >=294 )
  {
  monkey.velocityY = -16.5 
    jumpSound.play();
  }
// console.log(monkey.y); 
  monkey.velocityY = monkey.velocityY+1;
  
   ground.velocityX = -(4+monkeyEaten/5); 
  
 
  
   if (ground.x < 160)
    {
      ground.x = ground.width/3;
    }
  
  
  survivalTime =  Math.ceil(frameCount/frameRate());
  
  monkeybanana();
  
   monkeyobstacle();
  
  groundInvisidle.visible = false;
  restart.visible = false;
  gameOver.visible = false;
    
     if(foodGroup.isTouching(monkey))
    {
       foodGroup.destroyEach();
      monkeyEaten = monkeyEaten+1;
      eatSound.play();
    }
    if(obstacleGroup.isTouching(monkey))
    {
        gameState = END; 
      gameOvervarSound.play();
    }
  }
  
   else if (gameState === END) 
   {
    restart.visible = true;
    gameOver.visible = true;
    monkey.visible = false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
     ground.velocityX = 0;
     
    
      
  if(mousePressedOver(restart)) {
      reset();
   
  }
  }
   
   
  monkey.collide(groundInvisidle);
  drawSprites();
  
  stroke("red")
  textSize(20)
  fill("black")
  text("Survival Time : "+survivalTime, 100,50);
  text("Monkey Eaten Banana : "+monkeyEaten, 300,50);
}


function reset()
{
 gameState = PLAY; 
  monkey.visible = true;
  survivalTime = 0;
 monkeyEaten = 0;
}

function monkeybanana()
{
    if(frameCount%80===0)
    {
 
      banana = createSprite(600,80,20,20)
      banana.addImage("banana",bananaImage)
      banana.scale = 0.1;
      banana.velocityX = -(8+monkeyEaten/5);    
      banana.y = Math.round(random(120,200));
      banana.lifetime = 80;
      foodGroup.add(banana);
      
    }
}

function monkeyobstacle()
{
  if(frameCount%300===0)
    {
 
    obstacle = createSprite(600,300,20,20)
    obstacle.addImage("stone", obstalceImage)
    obstacle.scale = 0.15;
    obstacle.velocityX = -(8+monkeyEaten/5);    
    //obstacle.y = Math.round(random(120,200));
    obstacle.lifetime = 80;
    obstacleGroup.add(obstacle); 
    }
}



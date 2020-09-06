var monkeyAnimation, bananaImage, obstacleImage, stoneImage, rock, banana;
var player
var obstacleGroup, foodGroup;
var background2, background1, invisibleFloor;
var score;

function preload(){
 
monkeyAnimation = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 
  background1 = loadImage("jungle.png");
  
  stoneImage = loadImage("stone.png")
  bananaImage = loadImage("banana.png");
}
 
function setup() {
  createCanvas(400, 400);
 
  score = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  player = createSprite (200,300,10,10)
  player.addAnimation("Monkey_animation", monkeyAnimation);
  background2 = createSprite(200,200,10,10);
  background2.addImage("background1", background1);
  invisibleFloor = createSprite (200, 350, 400, 10)
}
 
function draw() {
  background(220);
 
  
  player.depth = 100
 
  background2.scale = 1.5
 
  if(player.y >= 300){
  player.velocityY = 0;
  }
  
  player.collide (invisibleFloor)
  
    //jump when the space key is pressed
    if(keyDown("space") && player.y >= 290){
      player.velocityY = -12 ;
    }
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
  
  if (foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+2
    player.scale=player.scale+0.05
}
 
  if (obstacleGroup.isTouching(player)){
   player.scale = player.scale-0.02;  
}
 
  invisibleFloor.visible = false;
  
  spawnbananas();
  spawnRocks(); 
 drawSprites();
  textSize(10)
 text("score:"+score, 340, 50)
}

function spawnRocks() {
  if(World.frameCount % 40 === 0) {
    var rock = createSprite(400,330,10,40);
    rock.velocityX = -(6 + 3*frameCount/100);
    
    rock.addImage("stoneImage", stoneImage)
    
    //assign scale and lifetime to the rock           
    rock.scale = 0.1;
    rock.lifetime = 70; 
    
    //add each rock to the group
    obstacleGroup.add(rock);
  }
}


function spawnbananas() {
  //spawn bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = random(220,250);
    banana.addAnimation("bananaImage", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = player.depth;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
  
}

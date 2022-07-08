var spaceImg, space;
var meteorImg, meteor, meteorsGroup;
var coinImg, coin, coinGroup;
var rocketImg, rocket;
var gameState = "play";
var score;
//var gameoverImg;

function preload(){
  spaceImg = loadImage("space.avif");
  meteorImg = loadImage("meteor1.png");
  coinImg = loadImage("coin.png");
  rocketImg = loadImage("rocket.png");
}

function setup(){
  createCanvas(600,600);
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  
  meteorsGroup = new Group();
  coinGroup = new Group();
  
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.1;
  rocket.addImage("rocket", rocketImg);

  score = 0;

}

function draw(){
  background(0);

  //display score




  if (gameState === "play") {

    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(space.y > 400){
      space.y = 300
    }

    spawnMeteors();
    spawnCoins();

    

    if(meteorsGroup.isTouching(rocket))
    {
      rocket.velocityY = 0;
      rocket.destroy();
      gameState = "end";
    }

    if(coinGroup.isTouching(rocket)){
      coinGroup.destroyEach();
      score += 5;
    }
    
    drawSprites();

    stroke("red");
    fill("pink");
    textSize(20);
    text("Score: "+ score,500,50);

  }
  
  //if(rocket.y > 600||rocket.x>201||rocket.x<-50){
   // gameState = "end";
  //}


  if (gameState === "end"){
    stroke("red");
    fill("pink");
    textSize(40);
    text("Game Over!", 200,250)

    stroke("red");
    fill("pink");
    textSize(20);
    text("Score: "+ score,500,50);
  }

}

function spawnMeteors() {

  if (frameCount % 150 === 0) {
    var meteor = createSprite(200, -50);
    meteor.x = Math.round(random(120,400));
    meteor.scale = 0.15

    meteor.addImage(meteorImg);

    meteor.velocityY = 1;
    
    rocket.depth = meteor.depth;
    rocket.depth +=1;
   
    meteor.lifetime = 700;

    meteorsGroup.add(meteor);
  }
}

function spawnCoins() {

    if (frameCount % 240 === 0) {
      var coin = createSprite(150, -45);
      coin.x = Math.round(random(120,400));
      coin.scale = 0.05
      
      coin.addImage(coinImg);
  
      coin.velocityY = 1;
      
      rocket.depth = coin.depth;
      rocket.depth +=1;
     
      coin.lifetime = 700;
  
      coinGroup.add(coin);
    }
  }
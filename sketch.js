//gamestates
var PLAY = 1;
var END = 0;
var CRASH=2;
var gameState = PLAY;
var score=0;

//background
var ground,backgroundimg;

//crash
var crash;

//bike
var bikeimg,bikeimg2,bike,bike3right,bike3left;

//car
var car;

//car1
var car1img;

//car2
var car2img;

//car3
var car3img;

//car4
var car4img;

//car5
var car5img;

//car6
var car6img;

//car7
var car7img;

//rockstar
var rockstarimg,rockstar;

//boom
var boomimg,boom;

//crashsound
var crashsnd;

//scoresnd
var scoresnd;

//gameend
var RESTART,GAMEOVER;

//gameoverimg
var gameoverimg;

//stone
var stone,stoneimg,StoneGroup;

//pause,play
var pause,play,button;

var pauseimg,playimg;

var playing;


function preload(){
//backgroundimg
backgroundimg = loadImage("images/backgroundimg.jpg")

//bikeimg
bikeimg = loadAnimation("images/bike3.png")

//bikeimg2
bikeimg2 = loadImage("images/bike3.png")

//bike3right
bike3right = loadAnimation("images/bike3right.jpeg")

//bike3left
bike3left = loadAnimation("images/bike3left.jpeg")

//car1img
car1img = loadImage("images/car1.png")

//car2img
car2img = loadImage("images/car2.png")

//car3img
car3img = loadImage("images/car3.png")

//car4img
car4img = loadImage("images/car4.png")

//car5img
car5img = loadImage("images/car5.png")

//car6img
car6img = loadImage("images/car6.png")

//car7img
car7img = loadImage("images/car7.png")

//rockstarimg
rockstarimg = loadImage("images/rockstar.png")

//boomimg
boomimg = loadImage("images/boom.png")

//restart
restartimg = loadImage("images/restartimg.jpg")

//gameoverimg
gameoverimg = loadImage("images/gameover.jpg")

//crashsound
crashsnd = loadSound("sounds/crash.mp3")

//stoneimg
stoneimg = loadImage("images/Stone.jpg")

//scoresnd
scoresnd = loadSound("sounds/score.mp3")

playing = loadSound("sounds/playing.mp3")

//pauseimg
pauseimg = loadImage("images/pause.jpg")

//playimg
playimg = loadImage("images/pause.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
//ground
ground = createSprite(350,350,windowWidth, windowHeight);
  ground.addImage("ground",backgroundimg);

  //bike
  bike = createSprite(300,320,50,50);
  bike.addAnimation("bikeimg",bikeimg);
  bike.scale = 0.6;

  //rockstar
  rockstar = createSprite(width/2-120, height/2-150,50,50);
  rockstar.addImage("rockstar",rockstarimg);
  rockstar.scale = 0.3;

  RESTART = createSprite(width/2-20, height/2-100,30,30);
  RESTART.addImage("restart",restartimg);
  RESTART.scale=0.6;
  RESTART.visible=false;

  GAMEOVER = createSprite(width/2-20, height/2+200,30,20);
  GAMEOVER.addImage("gameover",gameoverimg);
  GAMEOVER.scale=0.8;
  GAMEOVER.visible=false;

  //button = createButton("PLAY");
  //.mousePressed(togglePlaying);
  //button.position(1020,10);


  score=0;
   CarsGroup = new Group();
   BoostGroup = new Group();
   StoneGroup= new Group();
}

function draw() {
  background("black");

  if (gameState === PLAY){
  bike.velocityX = 0;
  bike.velocityY = 0; 

  score = score + Math.round(getFrameRate()/60);
  ground.velocityY = (6+2*score/100);

  if (score%150 === 0){
      scoresnd.play();

    } 

    if (score === 0){
            scoresnd.stop();
    }
 
  if (ground.y > 700) {
   ground.y = 350
}

  // right arrow
   //if(touches.length>0 || keyDown("RIGHT_ARROW")) {    
   // bike.velocityX = 10;
   // }
 
  //left arrow
  //if(touches.length>0 || keyDown("LEFT_ARROW")) {
  //  bike.velocityX = -10;
  //}

  bike.x = World.mouseX;

      
  if (bike.x<100 || bike.x>600 || CarsGroup.isTouching(bike) || bike.isTouching(StoneGroup)){     
   gameState=END; 
   crashsnd.play();
  }


  spawncars();
  spawncars2();
  spawncars3();
  spawncars4();
  spawnstone();
}

else if (gameState==END){
        CarsGroup.setVelocityXEach(0);
        CarsGroup.setVelocityYEach(0);
        StoneGroup.setVelocityYEach(0);
        StoneGroup.destroyEach();
        CarsGroup.destroyEach();
        ground.velocityX=0;
        ground.velocityY=0;
        bike.visible=false;
        RESTART.visible=true;
        GAMEOVER.visible=true; 
        
}

if(touches.length>0 || mousePressedOver(RESTART) && gameState === END) {
        gameState = PLAY;
        reset();
}

      
      

drawSprites();

textSize(30);
  textFont(20);
  fill ("yellow")
  text("SCORE: "+ score,width/2-100, height/2-150);

}

function reset(){
  gameState = PLAY;  
  CarsGroup.setVelocityXEach(0);
  CarsGroup.setVelocityYEach(-6);
  ground.velocityY=6;
  bike.visible=true;
  bike.x = 400;
  bike.y = 400;
  GAMEOVER.visible=false;
  RESTART.visible=false;
  score=0;
}

function togglePlaying(){
        if(!playing.isPlaying()){
                playing.play();
                playing.setVolume(0.5);
                button.html("PAUSE");
        }
        else{
                playing.pause();
                button.html("PLAY");
        }
}

function spawnstone() {
        if(frameCount % 300 === 0) {
           stone = createSprite(350,15,50,50);
          stone.addImage(stoneimg);
          stone.scale=0.5;
          stone.velocityY = 4;
      
          //assign scale and lifetime to the car           
          stone.lifetime = 400 ; 
        StoneGroup.add(stone);      }
      }

function spawncars() {
  if(frameCount % 60 === 0) {
     car = createSprite(300,height-100,10,40);

    car.velocityY = -(8+6*score/100);
      car.scale = 1.2;
   
                                                                                    
    //generate random cars
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: car.addImage(car1img);
              break;
      case 2: car.addImage(car2img);
              break;
      case 3: car.addImage(car3img);
              break;
      case 4: car.addImage(car4img);
              break;
      case 5: car.addImage(car5img);
              break;
      case 6: car.addImage(car6img);
              break;  
      case 7: car.addImage(car7img);
              break;      
      default: break;
    }

    //assign scale and lifetime to the car           
    car.lifetime = 300;
    //add each car to the group
    CarsGroup.add(car);
  }
}

function spawncars2() {
  if(frameCount % 130 === 0) {
     car = createSprite(400,height-200,10,40);
    car.velocityY = -(8+6*score/100);
      car.scale = 1.2;
                                                                                    
    //generate random cars
    var rand = Math.round(random(1,5));
    switch(rand){
    case 1: car.addImage(car1img);
              break;
      case 2: car.addImage(car2img);
              break;
      case 3: car.addImage(car3img);
              break;
      case 4: car.addImage(car4img);
              break;
      case 5: car.addImage(car5img);
              break;
      case 6: car.addImage(car6img);
              break;  
      case 7: car.addImage(car7img);
              break;      
      default: break;
    }

    //assign scale and lifetime to the car           
    car.lifetime = 300;
    //add each car to the group
    CarsGroup.add(car);
  }
}

function spawncars3() {
  if(frameCount % 260  === 0) {
     car = createSprite(200,height-300,10,40);
    car.velocityY = -(8+6*score/100);
      car.scale = 1.2;
                                                                                    
    //generate random cars
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: car.addImage(car1img);
              break;
      case 2: car.addImage(car2img);
              break;
      case 3: car.addImage(car3img);
              break;
      case 4: car.addImage(car4img);
              break;
      case 5: car.addImage(car5img);
              break;
      case 6: car.addImage(car6img);
              break;  
      case 7: car.addImage(car7img);
              break;      
      default: break;
    }

    //assign scale and lifetime to the car           
    car.lifetime = 300;
    //add each car to the group
    CarsGroup.add(car);
  }
}

function spawncars4() {
  if(frameCount % 180 === 0) {
     car = createSprite(450,height-250,10,40);
    car.velocityY = -(8+6*score/100);
      car.scale = 1.2;
                                                                                    
    //generate random cars
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: car.addImage(car1img);
              break;
      case 2: car.addImage(car2img);
              break;
      case 3: car.addImage(car3img);
              break;
      case 4: car.addImage(car4img);
              break;
      case 5: car.addImage(car5img);
              break;
      case 6: car.addImage(car6img);
              break;  
      case 7: car.addImage(car7img);
              break;      
      default: break;
    }

    //assign scale and lifetime to the car           
    car.lifetime = 300;
    //add each car to the group
    CarsGroup.add(car);
  }
}


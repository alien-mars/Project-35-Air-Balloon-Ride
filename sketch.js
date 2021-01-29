var balloon;
var backgroundImg;
var balloonAnimation;
var balloonPosition;

function preload(){
 backgroundImg = loadImage("Hot Air Ballon-01.png");
 balloonAnimation = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() {

  createCanvas(1000,600);

  database = firebase.database(); 
  console.log(database); 

  balloon = createSprite(100,430,50,80);
  balloon.addAnimation("hotairBalloon",balloonAnimation);
  balloon.scale = 0.45;

  balloonPosition = database.ref('Balloon/position');
  balloonPosition.on("value",readPosition,showError);
  
}

function draw() {
  background(backgroundImg);  

  fill(0);
  textSize(25);
  text("Use Arrow Keys To Move Hot Air Balloon!",50,30);
 
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10);
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
}

function updatePosition(x,y){
  database.ref('Balloon/position').set({
    x : balloon.x + x,
    y : balloon.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
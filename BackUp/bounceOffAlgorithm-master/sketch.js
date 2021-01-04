//to create game states 
const SERVE = 1;
const PLAY = 2;
const END = -1;
const WIN = 3;
const TOUCHED = 0;
var gameState = SERVE;

// to create the player boy
var player, playerShIMG, playerNorIMG;

// creating the edges
var edge1, edge2;

// to create sanitizer drop and its group
var drop,dropGrp;

// to create corona and corona group
var corona1, coronaGrp1;
var corona2, coronaGrp2;
var corona3, coronaGrp3;
var coronaIMG;

//to make the immunity and lives
var immunity = 500;
var lives = 2;

//to store score
var score = 0;

function preload() {
  playerShIMG = loadImage("images/Shoot b.png");
  playerNorIMG = loadImage("images/Boy norm b.png");

  coronaIMG = loadImage("images/corona_final.png")
}

function setup() {
  createCanvas(1200,800);
  player =  createSprite(width/2, 100, 50, 100);
  player.addImage("normal",playerNorIMG);
  player.addImage("shoot", playerShIMG);

  dropGrp = createGroup();
  coronaGrp1 = createGroup();
  coronaGrp2 = createGroup();
  coronaGrp3 = createGroup();

  edge1 = createSprite(-5, 50, 10, 100);
  edge2 = createSprite(1205, 50, 10, 100);

}

function draw() {
  background(0,0,0); 

  //colliding the player with the edges
  player.bounce(edge1);
  player.bounce(edge2);

  if(gameState === PLAY) {
    
    // to make the controls of the player
    if(keyDown('right')) {
      player.x = player.x + 20; 
    }

    if(keyDown('left')) {
      player.x = player.x - 20; 
    }

    //to destroy the corona when the drop touches it
    if(dropGrp.isTouching(coronaGrp1)) {
      coronaGrp1.destroyEach();
      dropGrp.destroyEach();
      score = score + 1;
    }

    if(dropGrp.isTouching(coronaGrp2)) {
      coronaGrp2.destroyEach();
      dropGrp.destroyEach();
      score = score + 1;
    }

    if(dropGrp.isTouching(coronaGrp3)) {
      coronaGrp3.destroyEach();
      dropGrp.destroyEach();
      score = score + 1;
    }

    if(score === 15){
      gameState = WIN
    }

    //making the condition when the corona touches the player
    
    if(immunity > 0 & coronaGrp1.isTouching(player) || coronaGrp2.isTouching(player) || coronaGrp3.isTouching(player)) {
      coronaGrp1.destroyEach();
      coronaGrp2.destroyEach();
      coronaGrp3.destroyEach();

      if(immunity != 0) {
        immunity = immunity - 100
      }

      gameState = TOUCHED;
    }

    if(immunity === 0 && coronaGrp1.isTouching(player) || coronaGrp2.isTouching(player) || coronaGrp3.isTouching(player)) {
      lives = lives - 1;
  
      coronaGrp1.destroyEach();
      coronaGrp2.destroyEach();
      coronaGrp3.destroyEach();
  
      gameState = TOUCHED;
    }
  }



  if(lives === 0){
    gameState = END;
  }

  // to spwan drops on pressing the space
  spawnDrop();

  spawnCorona();
  console.log(immunity);
  console.log(lives);

  drawSprites();

  //to display score
  fill("white");
  textSize(40);
  text("Score: " + score, 1030, 50);

  //to display the immunity and lives
  text("Immunity: " + immunity, 10, 30);
  text("Lives: " + lives, 10, 80);

  if(gameState === SERVE) {
    //to give instructions to the player
    fill("white");
    textSize(20);
    text("Welcome to the corona game. Be a corona and fight against corona with sanitizer. Beware if it touches you, your immunity will ", 20, 500);
    text("decrease by 100. You have 500 immunity and 2 lives. Press space to shoot.", 20, 520);
    text("'press space to countinue'", 420,600);
    
    //to change the game state to play
    if(keyWentDown('space')) {
      gameState = PLAY;
    }
  }

  if(gameState === TOUCHED) {
    fill("white");
    textSize(30);

    text("Oh!! Corona touched you. Be careful", 20, 500);
    
    if(keyDown('space')){
      gameState = PLAY;
    }
  }

  if(gameState === END) {
    fill("white");
    textSize(55);
    textFont("Georgia");
    text("Game Over!!", 400, height/2);

    player.x = width/2;
    player.y = 60;

    coronaGrp1.destroyEach();
    coronaGrp2.destroyEach();
    coronaGrp3.destroyEach();

    if(keyWentDown('space')){
      gameState = SERVE;
    }
  }

  if(gameState === WIN) {
    fill("white");
    textSize(55);
    textFont("Georgia");
    text("You Win!!",450, height/2);

    player.x = width/2;
    player.y = 60;

    coronaGrp1.destroyEach();
    coronaGrp2.destroyEach();
    coronaGrp3.destroyEach();
  }

}

function spawnDrop() {
  if(gameState === PLAY) {
    if(keyWentDown('space')) {
      player.changeImage("shoot", playerShIMG);
      drop = createSprite(player.x, player.y + 50, 10,10);
      drop.velocityY = 8;     
      dropGrp.add(drop);
    }

    if(keyWentUp('space')){
      player.changeImage("normal", playerNorIMG);
    }
  }
}

function spawnCorona() {
  if(gameState === PLAY) {
    if(World.frameCount % 100 === 0) {
      corona1 = createSprite(random(20, 1170), 800, 50,50);
      corona1.addImage(coronaIMG);
      corona1.scale = random(0.5, 0.7);
      corona1.velocityY = random(-7,-9) ;
      coronaGrp1.add(corona1);
    }
  
    if(World.frameCount % 150 === 0) {
      corona2 = createSprite(random(20, 1170), 800, 50,50);
      corona2.addImage(coronaIMG);
      corona1.scale = random(0.5, 0.7);
      corona2.velocityY = random(-7,-9);
      coronaGrp2.add(corona2);
    }
  
    if(World.frameCount % 200 === 0) {
      corona3 = createSprite(random(20, 1170), 800, 50,50);
      corona3.addImage(coronaIMG);
      corona1.scale = random(0.5, 0.7);
      corona3.velocityY = random(-7,-9);
      coronaGrp3.add(corona3);
    }
  }
  
}
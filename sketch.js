var ball;
function preload(){
   bg = loadImage("images/bg.png")
   balloon = loadImage("images/balloon.png") 
}
function setup(){
    createCanvas(1000,1000);
    database = firebase.database()
    ball = createSprite(250,250,10,10);
    ball.addImage(balloon)
    ball.shapeColor = "red";
    ball.scale = 0.5
    var ballrep = database.ref('balloon/position')
    ballrep.on("value",reedposition,errorfunction)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        updatevalues(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatevalues(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatevalues(0,-1);
        ball.scale=ball.scale-0.08
    }
    else if(keyDown(DOWN_ARROW)){
        updatevalues(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function reedposition(data){
    position=data.val()
    ball.x=position.x
    ball.y=position.y
}
function errorfunction(){
    console.log("error.database")

}
function updatevalues(x,y){
    database.ref('balloon/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}
// VARIABLES
var currPosY = 0; //WHITE CAR
var currPosX = 125; //WHITE CAR
// var currPosY2 = 0; //YELLOW CAR
// var currPosX2 = 200; //YELLOW CAR
var currPosMyCarY = 530; // RED CAR car
var currPosMyCarX = 125; // RED CAR
var speed = 1;
var dist = 0;
var timer = 0;
var collision = 0;

//ELEMENTS BY ID VARIABLES
var Car = document.getElementById("car");  // WHITE CAR
// var Car2 = document.getElementById("car2");  // YELLOW CAR
var	Road = document.getElementById("road");  // ROAD
var MyCar = document.getElementById("myCar"); // RED CAR
var Speed = document.getElementById("speedSign");
var Distance = document.getElementById("distanceSign");
var Timer = document.getElementById("timerSign");
var Collision = document.getElementById("collisionSign");
var RoadImage = document.getElementById("roadImage");
var TimerID; 
var crashSound = document.getElementById("CrashSound"); 
var streetSound = document.getElementById("StreetSound"); 

//EVENT LISTENERS FOR BUTTONS
document.getElementById("Start").addEventListener("click", startMove);
document.getElementById("Stop").addEventListener("click", stopMove);
document.getElementById("Reset").addEventListener("click", Reset);
document.getElementById("speedUp").addEventListener("click", speedUp);
document.getElementById("speedDown").addEventListener("click", speedDown);
document.getElementById("leftButton").addEventListener("click", moveMyCarLeft);
document.getElementById("rightButton").addEventListener("click", moveMyCarRight);

//EVENT LISTENERS FOR KEYBOARD
document.addEventListener('keydown', keyboard);

//FUNCTIONS TO CONTROL THE CAR WITH THE KEYBOARD
function keyboard(event) {
    if(event.keyCode == 37) {
        moveMyCarLeft();
    }
    else if(event.keyCode == 39) {
        moveMyCarRight();
    }
	else if(event.keyCode == 38) {
        speedUp();
	}
	else if(event.keyCode == 40) {
        speedDown();
	}
	else if(event.keyCode == 13) {
        startMove(); // with enter key
	}
}

//FUNCTION TO STOP THE CAR WHEN IT CRASHES
function stopMove() 
{
	collisionSign(); // TO ADD 1 TO COLLISION SIGN
	clearInterval(TimerID);
	RoadImage.style.animation = "slide 0s linear infinite"; //TO STOP BACKGROUND ANIMATION
}
//FUNCTION TO START THE GAME
function startMove() 
{
	stopMove();
	StreetSound();
	RoadImage.style.animation = "slide 60s linear infinite";	//TO START BACKGROUND ANIMATION
	currPosY = 0; //TO BEGIN FROM THE TOP OF THE SCREEN
	CarRandomPosition(); // FUNCTION TO START IN A RANDOM PLACE
	TimerID = setInterval(incomingTraffic, 1);
}
// FUNCTION TO RELOAD THE WEBPAGE
function Reset(){
	location.reload(); 
}
//FUNCTION TO INCREASE SPEED
function speedUp(){ 
	if(speed < 10){
	speed += 1;
	}
	else{
	speed = 10;
	}
	speedSign();
}
//FUNCTION TO DECREASE SPEED
function speedDown(){ 
	if(speed > 1){
	speed -= 1;
	}
	else{
	speed = 1;
	}
	speedSign();
}
//FUNCTION TO SHOW THE SPEED ON THE SPEED SIGN
function speedSign(){ 
	Speed.innerHTML = "Speed: " + "<br>" + (speed*10) + " Km/h";
}
//FUNCTION TO SHOW THE TIMER ON THE TIMER SIGN
function timerSign(){
	Timer.innerHTML = "Timer: " + "<br>" + (timer/360).toFixed(2) + " Sec";
}
//FUNCTION TO SHOW THE DISTANCE ON THE DISTANCE SIGN
function distanceSign(){ 
	Distance.innerHTML = "Distance: " + "<br>" + dist.toFixed(2) + " Km";
	}
//FUNCTION TO SHOW THE NUMBER OF COLLISIONS ON THE COLLISIONS SIGN
function collisionSign(){
	Collision.innerHTML = "Number of Collitions: " + "<br>" + collision;
}
//FUNCTION 
function incomingTraffic(){
	timer++;
	currPosY += speed;
	dist = speed*timer/10000;
	distanceSign();
	timerSign();
	collisionSign();
	if(currPosMyCarX == currPosX && ((currPosMyCarY - 50) - currPosY < 5) && ((currPosMyCarY - 50) - currPosY >= 0)){ // TO CHECK IF THE CARS CRASHED
		collision++;
		CrashSound();
		pauseSound();
		stopMove();
		}
	else if(currPosY<=600){ // TO MOVE THE WHITE CAR DOWN
		Car.style.top = currPosY + "px";
		}
	else {
		currPosY = 0; // IF DID NOT CRASH SEND ANOTHER CAR IN RANDOM POSITION
		CarRandomPosition();
		}
}
//FUNCTION TO CHANGE CAR POSITION RANDOMLY
function CarRandomPosition(){ 
	var rnd = Math.random();	
		
	if (rnd < 0.25) {
		currPosX = 125;
	}
	else if (rnd < 0.5) {
		currPosX = 200;
	}
	else if (rnd < 0.75) {
		currPosX =  275;
	}
	else {
		currPosX =  350;
	}
	Car.style.left = currPosX + "px";
}
//FUNCTION TO MOVE RED CAR LEFT
function moveMyCarLeft(){ 
	currPosMyCarX -= 75;
	if(currPosMyCarX>=125){
	MyCar.style.left = currPosMyCarX + "px";
	}
	else {
		currPosMyCarX = 125;
	}
}	
//FUNCTION TO MOVE RED CAR RIGHT
function moveMyCarRight(){ 
	currPosMyCarX += 75;
	if(currPosMyCarX<=350){
	MyCar.style.left = currPosMyCarX + "px";
	}
	else {
		currPosMyCarX = 350;
	}
}		
//FUNCTION TO MOVE RED CAR UP
function moveMyCarUp(){ //THIS FUNCTION IS NOT USED IN THIS GAME
	currPosMyCarY -= 40;
	if(currPosMyCarY>=0){ 
	MyCar.style.top = currPosMyCarY + "px";
	}
	else {
		currPosMyCarY = 0;
	}
}		
//FUNCTION TO MOVE RED CAR DOWN
function moveMyCarDown(){ //THIS FUNCTION IS NOT USED IN THIS GAME
	currPosMyCarY += 40;
	if(currPosMyCarY<=530){ 
	MyCar.style.top = currPosMyCarY + "px";
	}
	else {
		currPosMyCarY = 530;
	}
}		
//FUNCTION TO PLAY A SOUND WHEN COLLISION
function CrashSound() { 
  crashSound.volume = 0.2;
  crashSound.play(); 
} 

function StreetSound() { 
	streetSound.volume = 0.2;
	streetSound.play(); 
} 

function pauseSound() { 
	streetSound.pause();	
}
	

	
	
	
	
	
	
	
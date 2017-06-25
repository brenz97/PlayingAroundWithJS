function Ball(xPos, yPos, rad, xVel, yVel){
	if(Math.abs(xPos)%790<10){
		this.x = (Math.abs(xPos)%790) +10;
	}else{
		this.x = Math.abs(xPos)%790;
	}
	if(Math.abs(yPos)%290<10){
		this.y = (Math.abs(yPos)%290) +10;
	} else{
		this.y = Math.abs(yPos)%290;
	}
	this.r = rad;
	this.xV	= xVel;
	this.yV = yVel;
	this.check = function(){
		if((this.x + this.xV)>(canvas.width-this.r) || (this.x + this.xV)<(this.r-1)){
			this.xV = this.xV*-1;
		}
		if((this.y+this.yV)>(canvas.height-this.r) || (this.y+this.yV)<(this.r-1)){
			this.yV = -this.yV;
		}
		this.x+=this.xV;
		this.y+=this.yV;
	}
}

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let colors = [//"#ffe6ff", "#ff8080", "#9448c4", "#e0e0d1",
			 "#00FF00"];
let balls = new Array();
for(i=1; i<151; i++){
	if(i%2==0){
		balls.push(new Ball(i*30, i*20, 10, 0.5, 0.5));
	} else{
		balls.push(new Ball(i*30, i*20, 10, -0.5, -0.5));
	}
}

function draw(){
	ctx.clearRect(0,0,800,300);
	for(i=0;i<balls.length;i++){
		balls[i].check();
		ctx.fillStyle = colors[i%colors.length];
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();	
	}
}

setInterval(function(){
	draw();
}, 5);

function addBall(){
	if(balls.length<10){
		let xTemp = document.getElementById("xPosition").value;
		let yTemp = document.getElementById("yPosition").value;
		let rTemp = document.getElementById("radius").value;
		if(!isNaN(xTemp) && !isNaN(yTemp) && !isNaN(rTemp)){
			if(yTemp<200 && xTemp<700 & rTemp<100){
				balls.push(new Ball(xTemp, yTemp, rTemp));
			}
		}
	}

}
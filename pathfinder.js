var font = document.getElementById("inputValues").style.fontFamily;
console.log(font);

function main(){
	var maze = [], history = [], queue = [], temp, width, height, inputMaze = "", flag = false;
	inputMaze = document.getElementById("inputValues").value;
	
	//console.log(inputMaze);
	
	inputMaze = inputMaze.replace(/(\s)/g, "");
	inputMaze = inputMaze.replace(/(\r\n|\r|\n)/g, "");
	
	//console.log(inputMaze);

	height = inputMaze.charAt(0);
	width = inputMaze.charAt(1);
	inputMaze = inputMaze.substr(2);
	
	//check if input is correct
	if(isNaN(height) || isNaN(width)){
		document.getElementById("out").innerHTML = "Please you correct input format";
		return;
	} 
	if(height<1 || width<1 || height>10 || width>10){
		document.getElementById("out").innerHTML = "Please enter dimensions under 10";
		return;
	}

	//console.log(inputMaze + " " + width + " " + height);
	
	//'build' maze
	for (var i=0; i<height; i++) {
		var c, row = [];
		for(var j=0; j<width; j++){
			c = inputMaze.charAt((i*height)+j);
			if(c=='s'){
				queue.push(new Cell(i, j, null));
			}
			row.push(c);
		}
		maze.push(row);
	}
	dcoument.getElementById("original").innerHTML = printMaze(maze);

	printMaze(maze, "out");
	var count=0;
	
	while(queue.length!=0){
		console.log(count);
		count++;

		var k, visited = false, temp = queue.shift();

		for(k=0; k<history.length; k++){
			if(compareCell(temp, history[k])){
				visited = true;
				break;
			}
		}
		history.push(temp);

		if(!visited){
			if(maze[temp.row][temp.col]=='e'){
				while(temp != null){
					maze[temp.row][temp.col]='*';
					temp = temp.node;
				}
				var t = printMaze(maze);
				document.getElementById("out").innerHTML = t;
				printHistory(history);
				console.log(history.length);
				break;
			} else{
				if(temp.row>0 && maze[temp.row-1][temp.col]!='o'){
					queue.push(new Cell(temp.row-1, temp.col, temp));
				}
				if(temp.row<maze.length && maze[temp.row+1][temp.col]!='o'){
					queue.push(new Cell(temp.row+1, temp.col, temp));
				}
				if(temp.col>0 && maze[temp.row][temp.col-1]!='o'){
					queue.push(new Cell(temp.row, temp.col-1, temp));
				}
				if(temp.col<maze[0].length && maze[temp.row][temp.col+1]!='o'){
					queue.push(new Cell(temp.row, temp.col+1, temp));
				}
			}
		}//end of if(visited)

	}//end of while

}//end of main

function Cell(r, c, n){
	this.row = r;
	this.col = c;
	this.node = n;
}

function printMaze(array){
	var string = "";
	for(var i=0; i<array.length; i++){
		for(var j=0; j< array[i].length; j++){
			string+=array[i][j];
		}
		string += "<br />";
	}
	console.log(string);
	return string;
}

function printHistory(array, element){
		for(var i=0; i<array.length;i++){
			console.log(array[i].row + " " + array[i].col + 
				" node: " + (array[i].node).row + " " + (array[i].node).col);
		}
}

function compareCell(cell1, cell2){
	if(cell1.row==cell2.row && cell1.col==cell2.col){
		return true;
	} else {
		return false;
	}
}
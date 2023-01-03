//initializing the game elements
canvas=document.getElementById("game");
var grid_x = 6;
var grid_y = 4;
canvas.width = 150*grid_x;
canvas.height = 150*grid_y;
const myImage = new Image(canvas.width, canvas.height);
myImage.src = 'horsehead.png';
let canvasElem = document.querySelector("canvas");
var click_coords={x_coord:0,y_coord:0};
var mouse_click_count=0;
var board=[];
for (let i = 0; i < grid_y; i++) { //making board
    var row=[];
    for (let j = 0; j < grid_x; j++) { 
        row[j] = 1;
    }
    board[i] = row;
}

function resetBoard(){
    canvas.style.display = "block";
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    board=[];
    for (let i = 0; i < grid_y; i++) { //making board
        var row=[];
        for (let j = 0; j < grid_x; j++) { 
            row[j] = 1;
        }
        board[i] = row;
    }
    click_coords={x_coord:0,y_coord:0};
    drawBoard();
    mouse_click_count=0;
    var button = document.getElementById("start");
    if (button.value=="Start Game!") button.value = "Reset?";
}

function drawGrid()
  {
    var canvas = document.getElementById('game');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.drawImage(myImage,0,0);
        var R = canvas.width / (2 * grid_x) * 0.75;
        for (let i = 0; i < grid_x - 1; i++) { //making board
            ctx.beginPath();
            ctx.moveTo(canvas.width * (i+1) / grid_x, 1);
            ctx.lineTo(canvas.width * (i+1) / grid_x, canvas.height-1);
            ctx.strokeStyle = '#000000'; //black
            ctx.stroke();
        }
        for (let i = 0; i < grid_y - 1; i++) { //making board pt. 2
            ctx.beginPath();
            ctx.moveTo(1, canvas.height * (i+1) / grid_y);
            ctx.lineTo(canvas.width-1, canvas.height * (i+1) / grid_y);
            ctx.strokeStyle = '#000000'; //black
            ctx.stroke();
        }
    }
}

function drawBoard(mouse_click_count)
{
    drawGrid();
    var canvas = document.getElementById('game');
    for (let i = 0; i < grid_x; i++) {
        for (let j = 0; j < grid_y; j++) {
            if(click_coords.y_coord>canvas.height*j/grid_y && click_coords.y_coord<canvas.height*(j+1)/grid_y && click_coords.x_coord>canvas.width*i/grid_x && click_coords.x_coord<canvas.width*(i+1)/grid_x){
                if(board[j][i] == 0){
                    board[j][i] = 1;
                }
                else if(board[j][i] == 1){
                    board[j][i] = 0;
                }
            }
            if(board[j][i] == 1){
                coverBox(i,j);
            }
        }
    }
    return 0;
}

function coverBox(i,j){
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    var boxWidth = canvas.width / grid_x - 2;
    var X = canvas.width * i / grid_x + 1;
    var Y = canvas.height * j / grid_y + 1;
    ctx.fillStyle = '#FFFFFF'; //red
    ctx.fillRect(X, Y, boxWidth, boxWidth);
}


function getMousePosition(canvas, event, click_coords) {
    let rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    click_coords.x_coord=x;
    click_coords.y_coord=y;
}

canvasElem.addEventListener("mousedown", function(e)
{
    var cnt=0;
    for(let i=0; i<grid_x;i++){
        for(let j=0;j<grid_y;j++){
            if (board[j][i]!=1){
                cnt++;
            }
        }
    }
    if(document.getElementById("start").value!="Start Game!"&&cnt!=grid_x*grid_y)
        getMousePosition(canvasElem, e, click_coords);
        var result=drawBoard(mouse_click_count);
        if(result==1){
            mouse_click_count++;
        }
});

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let total = 0;


let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";


// cria o cenário
function criarBG(){
    context.fillStyle = "#56d1f9";
    
    context.fillRect(0,0,16*box,16*box);
  
    //context.strokeRect(0, 0,16*box, 16*box);
}



function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.shadowBlur = 15;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box) ; // tamanho da snake   }
    }

}

// desenha a comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update); // pega a tecla 

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; // se a tecla apertada for 37 na tabela ascii então é esquerda
    if(event.keyCode == 38 && direction != "down") direction = "up"; // 38 cima
    if(event.keyCode == 39 && direction != "left") direction = "right"; // 39 direita
    if(event.keyCode == 40 && direction != "up") direction = "down"; // 40 baixo

}



function iniciarJogo(){

    document.getElementById("ponto").innerHTML = "Pontos : " + total;
    
    // define o limite da tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;


    // verifica se a cobrinha se chocou a todo momento
    for(i = 1; i < snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }



    criarBG(); 
    criarCobrinha(); 
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // faz o movimento da combrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX  -= box;
    if(direction == "up") snakeY    -= box;
    if(direction == "down") snakeY  += box;


    // verifica se a cobrinha colidiu ou não com a comida e retira o ultimo elemento da lista
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x =  Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
        total ++;
    }


 

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);



}


let jogo = setInterval(iniciarJogo, 100);











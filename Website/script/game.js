// função para perguntar ao usuário a opção do tamanho da largura e da altura do jogo



// função para trocar o usuário trocar o botão de pause e play e vice-versa
function playPause() {
    var status = document.getElementById("playPause").src;
    var corFundo = document.getElementById("botao-pp").style.backgroundColor;
    
    //Define o status do jogo como Pause 
    if(status == "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png")
    {
        document.getElementById("playPause").src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png";
        // corFundo = 'yellow';
    }
        
        
    //Define o status do jogo como Play
    if(status == "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png")
        document.getElementById("playPause").src = "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png";
}

// Desenho de uma peça
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d',{ alpha: false });

let inicial_x = canvas.width / 2;
let inicial_y = 0;

const dx = 0;
const dy = 1;

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
let peca = new Peca();
peca = peca.tipo;

// Variaveis para o teclado
var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;


function clear() {

}

function desenha()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    peca.forEach((row, y) =>{
        row.forEach((value, x) => {
            if (value != 0){
                context.fillStyle = 'red';
                context.fillRect(x + inicial_x, y+inicial_y, 1, 1);
            }
        });
    });
    inicial_x += dx;
    inicial_y += dy;

    if (inicial_y > canvas.height) {
        inicial_y = 0;
        inicial_x = canvas.width/2;
        peca = new Peca();
        peca = peca.tipo;
    }

    //Comando relaciona às teclas
    if(rightPressed) //Tecla direita
    {
        inicial_x = inicial_x + 10;
        if(inicial_x + 4 > canvas.width) //Checagem do limite direito
        {
            inicial_x = canvas.width - 4;
        }
    }
    if(leftPressed) //Tecla esquerda
    {
        inicial_x = inicial_x - 10;
        if(inicial_x < 0)   //Checagem do limite esquerdo
        {
            inicial_x = 0;
        }
    }
    if(downPressed) //Tecla inferior
    {
        inicial_y = inicial_y + 3;
    }
    if(upPressed) //Tecla Superior
        peca.tipo = rotate(peca);

    
}

// function update()
// {

// }

// anima();

// context.scale(2,2);
// let p = new Peca();
// desenha(p.tipo);



//Verificação dos botões pressionados
function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight')
    {
        rightPressed = true;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft')
    {
        leftPressed = true;
    }
    else if(e.key == 'Down' || e.key == 'ArrowDown')
    {
        downPressed = true;
    }
    else if(e.key == 'Up' || e.key == 'ArrowUp')
    {
        upPressed = true;
    }
}

//verificação dos botões soltos 
function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight')
    {
        rightPressed = false;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft')
    {
        leftPressed = false;
    }
    else if(e.key == 'Down' || e.key == 'ArrowDown')
    {
        downPressed = false;
    }
    else if(e.key == 'Up' || e.key == 'ArrowUp')
    {
        upPressed = false;
    }

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var test = setInterval(desenha, 200);

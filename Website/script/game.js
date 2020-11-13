// Desenho de uma peça
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d',{ alpha: false });

const COLS = 10;
const ROWS = 20;
var TAMANHO_BROCO = setTamanhoBROCO(ROWS);
const corPadrao = "#111" // cor das células
const bordaPadrao = "#rgba(255, 255, 255, 0.1)" // cor das bordinhas

let board = []

for (let linhaAtual = 0; linhaAtual < ROWS; linhaAtual++)
{
    board[linhaAtual] = []
    for (let colunaAtual = 0; colunaAtual < COLS; colunaAtual++)
    {
        board[linhaAtual][colunaAtual] = corPadrao // preenche as cores do board
    }
}

resize();

let inicial_x = parseInt(COLS / 2)-1;
let inicial_y = -1;

const dx = 0;
const dy = 1;

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
let peca = new Peca();
// peca = peca.tipo;

// Variaveis para o teclado
var upPressed, rightPressed, leftPressed, downPressed = false;

function gerenciaDesenho() {
    desenha();

    inicial_x += dx;
    inicial_y += dy;
}

function desenha()
{
    clear();
    desenhaBoard();
    peca.valueOf().forEach((row, y) =>{
        row.forEach((value, x) => {
            // console.log("x:" + x + " y:" + y);
            console.log("inicial_x: " + inicial_x + " inicial_y: " + inicial_y);
            if (value != 0){
                context.fillStyle = 'red';
                context.fillRect(blocoParaCoordenada(x+inicial_x), blocoParaCoordenada(y+inicial_y), TAMANHO_BROCO, TAMANHO_BROCO);
            }
        });
    });

    // Permite gerar uma nova peça ao sair do tabuleiro
    if (inicial_y >= ROWS - peca.altura) {
        inicial_y = ROWS
        resetPecas();    
    }
}

function gerenciarTeclas() {
    //Comando relacionado às teclas
    if(rightPressed) //Tecla direita
    {
        // Peça para a direita
        if(inicial_x < COLS-peca.largura) {
            inicial_x++;
        }
    }
    if(leftPressed) //Tecla esquerda
    {
        inicial_x--;
        if(inicial_x < 0)   //Checagem do limite esquerdo
        {
            inicial_x = 0;
        }
    }
    if(downPressed) //Tecla inferior
    {
        inicial_y += 1;
    }
    if(upPressed) //Tecla Superior
        peca.rotacionar()
    desenha();
}


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
    gerenciarTeclas();
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
    gerenciarTeclas();
}

desenhaBoard();
var test = setInterval(gerenciaDesenho, 1000);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
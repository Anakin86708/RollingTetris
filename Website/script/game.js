// Desenho de uma peça
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d', { alpha: false });

const COLS = 10;
const ROWS = 20;
var TAMANHO_BROCO = setTamanhoBROCO(ROWS);
const corPadrao = "#111" // cor das células
const bordaPadrao = "#rgba(255, 255, 255, 0.1)" // cor das bordinhas
var board = resetBoard();
var upPressed, rightPressed, leftPressed, downPressed = false;

resize();

let peca = new Peca();

const dx = 0;
const dy = 1;

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

// Variaveis para o teclado

function gerenciaDesenho() {
    // Verifica antes de desenhar se é possiver avançar
    if (!peca.colisorInferior(board)){
        // desenha();
        peca.pintaPecaBoard(board);
        resetPecas();
    }

    desenha();

    peca.x += dx;
    peca.y += dy;
}

function desenha() {
    clear();
    desenhaBoard();
    // alert('continuando')
    peca.valueOf().forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                context.fillStyle = 'red';
                context.fillRect(blocoParaCoordenada(x + peca.x), blocoParaCoordenada(y + peca.y), TAMANHO_BROCO, TAMANHO_BROCO);
            }
        });
    });

    proximaPeca();
}

// Comportamento relacionado à movimentação das peças
function gerenciarTeclas() {
    //Comando relacionado às teclas
    if (rightPressed) //Tecla direita
    {
        // Peça para a direita
        if (peca.x < COLS - peca.largura) {
            peca.x++;
        }
    }
    if (leftPressed) //Tecla esquerda
    {
        peca.x--;
        if (peca.x < 0)   //Checagem do limite esquerdo
        {
            peca.x = 0;
        }
    }
    if (downPressed) //Tecla inferior
    {
        peca.y += 1;
    }
    if (upPressed) //Tecla Superior
        peca.rotacionar()
    desenha();
}

//Verificação dos botões pressionados
function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
    else if (e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = true;
    }
    else if (e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = true;
    }
    gerenciarTeclas();
}

//verificação dos botões soltos 
function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
    else if (e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = false;
    }
    else if (e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = false;
    }
    gerenciarTeclas();
}


desenhaBoard();
var test = setInterval(gerenciaDesenho, 1000);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// audios no jogo - implementar as classes que estão no lugar de novoJogo, 
var novoJogo = new Audio('colocar url');
//audio quando começa a aumentar o nível de dificuldade do jogo
var jogoPerdido = new Audio('musica do jogo perdido');
//audio quando
var novoLevel = new Audio('Nova musica quando aumenta o level');





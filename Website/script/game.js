// Desenho de uma peça
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d', { alpha: false });

const COLS = 10;
const ROWS = 20;
var TAMANHO_BROCO = setTamanhoBROCO(ROWS);
const corPadrao = "#111" // cor das células
const bordaPadrao = "#rgba(255, 255, 255, 0.1)" // cor das bordinhas
var board = resetBoard();
var upPressed, rightPressed, leftPressed, downPressed, pPressed = false;

resize();

let peca = new Peca();
let pecaProxima = new Peca();

const dx = 0;
const dy = 1;

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);


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
    peca.desenhaDinamico(context, 'red');

    //Criação do tabuleiro reservado à próxima peça
    proximaPeca();

    //Print da próxima peça
    pecaProxima.desenhaDinamico(ctxNext, 'red', -3, 6);
}

// Comportamento relacionado à movimentação das peças
function gerenciarTeclas() {
    //Comando relacionado às teclas
    if(pPressed)
    {
        playPause();
    }
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
    else if (e.key == 'P' || e.key == 'p') {
        pPressed = true;
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
    else if (e.key == 'P' || e.key == 80) {
        pPressed = false;
    }
    gerenciarTeclas();
}


desenhaBoard();
//var test = setInterval(gerenciaDesenho, 1000);

var timer = new timer(gerenciaDesenho, 1000);

var botao = document.getElementById('playPause');

botao.addEventListener("click", function(){
    if(document.getElementById('playPause').src == "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png")
    {
        document.getElementById('playPause').src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png";
        timer.pause();
    }
    else if(document.getElementById('playPause').src == "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png")
    {
        document.getElementById('playPause').src = "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png"
        timer.resume();
    }
})

timer.resume();

// Eventos para tecla pressionada e tecla não pressionada
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// audios no jogo - implementar as classes que estão no lugar de novoJogo, 
var novoJogo = new Audio('colocar url');
//audio quando começa a aumentar o nível de dificuldade do jogo
var jogoPerdido = new Audio('musica do jogo perdido');
//audio quando
var novoLevel = new Audio('Nova musica quando aumenta o level');





// Desenho de uma peça
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d', { alpha: false });

//Canvas para a próxima peça
const canvasNext = document.getElementById('prox-piece');
const ctxNext = canvasNext.getContext('2d');

const COLS = 10;
const ROWS = 20;
var TAMANHO_BLOCO = setTamanhoBloco(ROWS);
const corPadrao = "#111" // cor das células
const bordaPadrao = "#rgba(255, 255, 255, 0.1)" // cor das bordinhas
var board = resetBoard();
var upPressed, rightPressed, leftPressed, downPressed, pPressed = false;  // Teclas do jogo

var POINTS = 0;
var quantLinhas = 0;
var sentidoBoardBaixo = true;
var tickGame = 1000;  // ms usados como velocidade do game

let peca = new Peca();

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

// Variaveis para o teclado

function gerenciaGame() {
    /* 
    Função dentro do tick do game.
    Responsável por realiar o desenho da peça e a alteração de velocidade
    */
    peca.descerPeca();
    linhaCompleta();
}

function desenha() {
    clear();
    desenhaBoard(context, board, ROWS, COLS);
    // Verifica antes de desenhar se é possiver avançar
    if (!peca.colisorInferior(board)) {
        // Peça colide com a inferior e é printada na tela
        peca.pintaPecaBoard(board);
        resetPecas();
    } else {
        peca.desenhanNoCanvas(context);
    }

    //Criação do tabuleiro reservado à próxima peça
    criaCanvasProx(ctxNext);
    // Atualiza desenho no canva proximo
    pecaProxima.desenhanNoCanvas(ctxNext, -3, 6);
}

// Verifica se uma linha está completa
function linhaCompleta() {
    let totalLinhas = 0;
    var pontosTotais = 0;
    var pontosAcumulados = 0;
    var contemEspecial = false;  // Variável usada para girar o tabuleiro

    for (let num = 0; num < 4; num++) {
        // Começar da ultima linha de board
        for (let lin = ROWS - 1; lin >= 0; lin--) {
            var completa = true;
            for (let col = 0; col < COLS; col++) {
                let corAtual = board[lin][col];
                if (corAtual == CORESPECIAL) {
                    contemEspecial = true;
                }
                if (corAtual == corPadrao) {
                    // Linha não está completa
                    completa = false;
                    break;
                }
            }

            if (completa) {
                // Descer tabuleiro
                descerTabuleiro(lin);

                // Realiza rotação
                if (contemEspecial) {
                    girarTabuleiro();
                }

                totalLinhas += 1;

                // Somar pontuação
                pontosAcumulados = somaPontos();
                // console.log('O pontosAcumulados: ' + pontosAcumulados);
                pontosTotais += pontosAcumulados;

                // Alterar a velocidade do game
                // 300 indica o valor múltiplo que deve ser usado para aumentar
                const multiplo = 300
                if (pontosTotais % multiplo == 0) {
                    aumentarVelocidade(multiplo);
                }

            }
        }
    }
    if (totalLinhas > 1) {
        // console.log('O totalLinhass é: ' + totalLinhass);
        ativaBonus(totalLinhas, pontosTotais);
    }
    // Verificar se todas as cores são diferentes da padrão
}

function aumentarVelocidade(multiplo) {
    tickGame = alterarTick(POINTS/multiplo);
}

// Comportamento relacionado à movimentação das peças
function gerenciarTeclas() {
    //Comando relacionado às teclas
    if (pPressed) {
        playPause();
    }
    if (rightPressed) //Tecla direita
    {
        // É possivel ir para a direita?
        if (peca.colisorLateral(board, true)) {
            // Peça para a direita
            if (peca.x < COLS - peca.largura) {
                peca.x++;
            }
        }
    }
    if (leftPressed) //Tecla esquerda
    {
        if (peca.colisorLateral(board, false)) {
            peca.x--;
            if (peca.x < 0)   //Checagem do limite esquerdo
            {
                peca.x = 0;
            }
        }
    }
    if (downPressed) //Tecla inferior
    {
        peca.descerPeca()
    }
    if (upPressed) //Tecla Superior
        peca.rotacionar()
    desenha();
}

function resetKey() {
    rightPressed = false;
    leftPressed = false;
    downPressed = false;
    upPressed = false;
}

//Verificação dos botões pressionados
function keyDownHandler(e) {
    resetKey();
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

async function girarTabuleiro() {
    // PROBLEMA AO TER ESPECIAL EM VARIAS COLUNAS
    if (sentidoBoardBaixo) {
        // Peças devem subir
        var anguloInicio = '0deg';
        var anguloFim = '180deg';
    } else {
        var anguloInicio = '180deg';
        var anguloFim = '360deg';
    }

    // Altera valores da transformaçào
    document.documentElement.style.setProperty('--angulo-inicial', anguloInicio);
    document.documentElement.style.setProperty('--angulo-final', anguloFim);

    animacaoTabuleiro();
    await sleep(1500);  // Deve ter o mesmo valor que o CSS
    document.getElementById('tetris').style.transform = 'rotate(' + anguloFim + ')';

    sentidoBoardBaixo = !sentidoBoardBaixo;
}

function animacaoTabuleiro() {
    const elem = document.getElementById('tetris');
    elem.style.animationPlayState = 'running';
    elem.classList.remove('play-rotacao');
    void elem.offsetWidth;
    elem.classList.add('play-rotacao');
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


// Limpa o canvas
resize();
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

// Primeiro desenho do board
desenhaBoard(context, board, ROWS, COLS);

var timer = new timer(gerenciaGame, tickGame);

var botao = document.getElementById('playPause');

botao.addEventListener("click", function () {
    if (document.getElementById('playPause').src == "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png") {
        document.getElementById('playPause').src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png";
        timer.pause();
    }
    else if (document.getElementById('playPause').src == "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png") {
        document.getElementById('playPause').src = "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png"
        timer.resume();
    }
})

timer.resume();

// Eventos para tecla pressionada e tecla não pressionada
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// WIP ENZO
// audios no jogo - implementar as classes que estão no lugar de novoJogo, 
// var novoJogo = new Audio('colocar url');
// //audio quando começa a aumentar o nível de dificuldade do jogo
// var jogoPerdido = new Audio('musica do jogo perdido');
// //audio quando
// var novoLevel = new Audio('Nova musica quando aumenta o level');

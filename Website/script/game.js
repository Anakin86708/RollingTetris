// Canvas do tetris
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d', { alpha: false });

//Canvas para a próxima peça
const canvasNext = document.getElementById('prox-piece');
const ctxNext = canvasNext.getContext('2d');

// Tamanhos do tabuleiro
const COLS = 10;
const ROWS = 20;
var TAMANHO_BLOCO = setTamanhoBloco('game', ROWS);
const corPadrao = "#111" // cor das células
const bordaPadrao = "#rgba(255, 255, 255, 0.1)" // cor das bordinhas
var board = resetBoard();
var upPressed, rightPressed, leftPressed, downPressed, pPressed = false;  // Teclas do jogo

var POINTS = 0;
var quantLinhas = 0;
var sentidoBoardBaixo = true;
var tickGame = 1000;  // ms usados como velocidade do game

let peca = new Peca(COLS);

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

let perdeu = false;
let statusPause = false;
var controleTrocado = false;

var segundo = 0;
var minuto = 0;
var tempoTotalPartida;

// Variaveis para o teclado

function gerenciaGame() {
    /* 
    Função dentro do tick do game.
    Responsável por realiar o desenho da peça e a alteração de velocidade
    */
    if (!statusPause) {
        peca.descerPeca();
        linhaCompleta();
    }
}

function desenha() {
    // Verifica antes de desenhar se é possiver avançar
    if (!peca.colisorInferior(board)) {
        // Peça colide com a inferior e é printada na tela
        peca.pintaPecaBoard(board);
        resetPecas();
    }

    clear();
    desenhaBoard(context, board, ROWS, COLS, TAMANHO_BLOCO);
    peca.desenhanNoCanvas(context);

    //Criação do tabuleiro reservado à próxima peça
    criaCanvasProx(ctxNext);
    // Atualiza desenho no canva proximo
    // Desenha apenas se o usuário ainda não perdeu o game.
    if (perdeu == false) {
        pecaProxima.desenhanNoCanvas(ctxNext, -3, 6);
    }
    else {
        timer.pause()
        statusPause = true;
    }

    pintaPecaProxima(ctxNext);

    // pecaProxima.desenhanNoCanvas(ctxNext, 0, 6);
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
    tickGame = alterarTick(POINTS / multiplo);
}

// Comportamento relacionado à movimentação das peças
function gerenciarTeclas() {
    //Comando relacionado às teclas
    if (pPressed) {
        playPause();
    }

    if (!statusPause) { // condição para permitir o movimento das peças SOMENTE se o jogo NÃO ESTIVER em pause.
        if (rightPressed) //Tecla direita
        {
            //Bloco irá para a direita
            if (controleTrocado == false) {
                // É possivel ir para a direita?
                if (peca.colisorLateral(board, true)) {
                    // Peça para a direita
                    if (peca.x < COLS - peca.largura) {
                        peca.x++;
                    }
                }
            }
            //Bloco irá para a direita (controle invertido)
            else {
                // É possivel ir para a direita?
                if (peca.colisorLateral(board, false)) {
                    peca.x--;
                    if (peca.x < 0)   //Checagem do limite direito (canvas invertido)
                        peca.x = 0;
                }
            }
        }
        if (leftPressed) //Tecla esquerda
        {
            //Bloco irá para a esquerda
            if (controleTrocado == false) {
                if (peca.colisorLateral(board, false)) {
                    peca.x--;
                    if (peca.x < 0)   //Checagem do limite esquerdo
                        peca.x = 0;
                }
            }
            //Bloco irá para a esquerda (controle invertido)
            else {
                if (peca.colisorLateral(board, true)) {
                    if (peca.x < COLS - peca.largura) //Checagem do limite esquerdo (canvas invertido)
                        peca.x++;
                }
            }
        }
        if (downPressed) //Tecla inferior
        {
            //Bloco irá descer
            if (controleTrocado == false) {
                peca.descerPeca();
            }
            //Bloco irá rotacionar (controle invertido)
            else {
                peca.rotacionar();
            }

        }
        if (upPressed) //Tecla Superior
            //Bloco irá rotacionar
            if (controleTrocado == false)
                peca.rotacionar()
            else { //Bloco irá subir (controle invertido)
                peca.descerPeca();
            }
        desenha();
    }
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
    else if (e.key == 'p' || e.code == 'KeyP') {
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
        controleTrocado = true;
    } else {
        var anguloInicio = '180deg';
        var anguloFim = '360deg';
        controleTrocado = false;
    }

    // Altera valores da transformaçào
    document.documentElement.style.setProperty('--angulo-inicial', anguloInicio);
    document.documentElement.style.setProperty('--angulo-final', anguloFim);

    animacao('tetris', 'play-rotacao');
    await sleep(1500);  // Deve ter o mesmo valor que o CSS
    document.getElementById('tetris').style.transform = 'rotate(' + anguloFim + ')';

    // Altera controles

    sentidoBoardBaixo = !sentidoBoardBaixo;
    gerarAjudaControles();
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
    else if (e.key == 'p' || e.code == 'KeyP') {
        pPressed = false;
    }
    gerenciarTeclas();
}

function gerarAjudaControles() {
    /*
    Cria os controles dinâmicamente para o usuário
    */
    let elem = document.getElementById("info-controles");
    elem.innerHTML = "";  // Limpa o conteúdo

    // Cria os elementos
    let cima = document.createElement('li');
    let baixo = document.createElement('li');
    let direita = document.createElement('li');
    let esquerda = document.createElement('li');
    let pause = document.createElement('li');

    // Configura o texto da tecla
    cima.innerText = 'Seta ⬆: ';
    baixo.innerText = 'Seta ⬇: ';
    direita.innerText = 'Seta ➡: ';
    esquerda.innerText = 'Seta ⬅: ';
    pause.innerText = '🅿: pause';

    if (sentidoBoardBaixo) {
        // Sentido normal
        cima.innerText += 'Rotacionar';
        baixo.innerText += 'Acelerar';
        direita.innerText += 'Mover direita';
        esquerda.innerText += 'Mover esquerda';
        // document.getElementById('controles').classList.remove('controles-inv');
    } else {
        cima.innerText += 'Acelerar';
        baixo.innerText += 'Rotacionar';
        direita.innerText += 'Mover esquerda';
        esquerda.innerText += 'Mover direita';
        // document.getElementById('controles').classList.add('controles-inv');
    }

    // Adiciona os elementos ao documento
    elem.appendChild(cima);
    elem.appendChild(baixo);
    elem.appendChild(direita);
    elem.appendChild(esquerda);
    elem.appendChild(pause);

    // Aplica animacao
    animacao('controles', 'play-controles');
}

// Exibe ajuda de controles
gerarAjudaControles();

// Limpa o canvas
resize();
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

// Primeiro desenho do board
desenhaBoard(context, board, ROWS, COLS, TAMANHO_BLOCO);

var timer = new timer(gerenciaGame, tickGame);
var botao = document.getElementById('playPause');
//Inicia a contagem de tempo do jogo
comecaTempoJogo();

botao.addEventListener("click", playPause);

timer.resume();

// Eventos para tecla pressionada e tecla não pressionada
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function restart() {
    board = resetBoard();
    resetPecas();
    desenhaBoard(context, board, ROWS, COLS);
    document.getElementById('gameover').style.visibility = 'hidden';
    
    if (!sentidoBoardBaixo){
        girarTabuleiro();
    }
    
    perdeu = false;
    statusPause = false;
    timer.resume();
    // reseta tempo
    minuto = 0;
    segundo = 0;
    comecaTempoJogo();
    //resetar pontos e linhas quebradas.
    POINTS = 0;
    quantLinhas = 0;
    document.getElementById('pontos').innerHTML = POINTS;
    document.getElementById('linhas').innerHTML = quantLinhas;
}

// WIP ENZO
// audios no jogo - implementar as classes que estão no lugar de novoJogo, 
// var novoJogo = new Audio('colocar url');
// //audio quando começa a aumentar o nível de dificuldade do jogo
// var jogoPerdido = new Audio('musica do jogo perdido');
// //audio quando
// var novoLevel = new Audio('Nova musica quando aumenta o level');

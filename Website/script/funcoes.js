// função para escolher opção do tamanho
function trocaLinhas() {
    var status = document.getElementById("tamanho-jogo").textContent
    console.log(status);

    if (status == '10x20') {
        document.getElementById("tamanho-jogo").innerText = '22x40';
        setTamanhoBROCO(40);
    }

    else if (status == '22x40') {
        document.getElementById("tamanho-jogo").innerText = '10x20';
        setTamanhoBROCO(20);
    }
}

// função que limpa 
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Varre todas as linhas e colunas da nossa matriz board, pegando a cor de cada célula e chamando a função desenhaQuadrado para  desenhar de fato a célula
function desenhaBoard() {
    for (let linhaAtual = 0; linhaAtual < ROWS; linhaAtual++) {
        for (let colunaAtual = 0; colunaAtual < COLS; colunaAtual++) {
            const corAtualCelula = board[linhaAtual][colunaAtual]; // pega a cor de cada quadradinho

            desenhaQuadrado(linhaAtual, colunaAtual, corAtualCelula);
        }
    }
}

// desenha de fato as células no nosso board.
function desenhaQuadrado(y, x, cor) {
    context.fillStyle = cor;
    context.fillRect(x * TAMANHO_BROCO, y * TAMANHO_BROCO, TAMANHO_BROCO, TAMANHO_BROCO);

    if (cor == corPadrao) {
        context.strokeStyle = bordaPadrao;
    }

    context.strokeRect(x * TAMANHO_BROCO, y * TAMANHO_BROCO, TAMANHO_BROCO, TAMANHO_BROCO);
}

function setTamanhoBROCO(qtdLinhas) {
    // 1 determine o menor tamanho
    // 2 veja uantos brocos vai querer
    // 3 calcule o tamanho de acordo
    const width = document.getElementById('game').offsetWidth;
    const height = document.getElementById('game').clientHeight - 100;
    const minSize = width < height ? width : height;
    console.log("Min size: " + minSize);

    return parseInt(minSize / qtdLinhas);
}


function resize() {
    TAMANHO_BROCO = setTamanhoBROCO(ROWS);
    canvas.height = document.getElementById('game').offsetHeight - 100;
    canvas.width = TAMANHO_BROCO * COLS;

    console.log("Width: " + canvas.width);
    console.log("Height: " + canvas.height);
}

// Converte valores da matriz (unidade do jogo) para a respectiva coordenada
// considerando o tamanho de um bloco
function blocoParaCoordenada(posBloco) {
    return posBloco * TAMANHO_BROCO;
}

// Usado para reiniciar pecas quando for necessário criar uma nova peça no
// inicio do tabuleiro
function resetPecas() {
    inicial_x = parseInt(COLS / 2) - 1;
    inicial_y = -1;
    
    //Peça movimentavel será a peçaProxima
    peca = pecaProxima;

    //Nova peça sendo criada para mostrar a proxima peça
    pecaProxima = new Peca();
}

function resetBoard() {
    // Setup inicial de board
    let board = [];
    // Desenhando fundo do board
    for (let linhaAtual = 0; linhaAtual < ROWS; linhaAtual++) {
        board[linhaAtual] = [];
        for (let colunaAtual = 0; colunaAtual < COLS; colunaAtual++) {
            board[linhaAtual][colunaAtual] = corPadrao; // preenche as cores do board
        }
    }
    return board;
}

//Canvas para a próxima jogada

//Define o canvas e o context
const canvasNext = document.getElementById('prox-piece');
const ctxNext = canvasNext.getContext('2d');

//Definição do tamanho do canvas e etc
function proximaPeca() {
    const COLUNA = 4;
    const LINHA = 8;
    const VAGO = "white"

    let board = [];

    for(l = 0; l < LINHA; l++){
        board[l] = []
        for(c = 0; c < COLUNA; c++){
            board[l][c] = VAGO;
        }
    }
    proxDesenhaBoard(LINHA, COLUNA);
}

//Insere cores no quadro criado
function proxDesenhaQuadrado(x,y,cor)
{
    ctxNext.fillStyle = cor;
    ctxNext.fillRect(x*20,y*20,20,20);

    if (cor == corPadrao) {
        context.strokeStyle = bordaPadrao;
    }

    // ctxNext.strokeStyle = 'black';
    ctxNext.strokeRect(x*20,y*20,20,20);

}

//Iniciliza o quadro
function proxDesenhaBoard(LINHA, COLUNA)
{
    for(r = 0; r<LINHA; r++){
        for(c = 0; c<COLUNA; c++){
            proxDesenhaQuadrado(c,r,board[r][c]);
        }
    }
}

//Função para a peça iniciar e pausar a animação
function timer(callback, delay) {
    var timerId;
    var start;
    var remaining = delay;
  
    this.pause = function () {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };
  
    var resume = function () {
      start = new Date();
      timerId = window.setTimeout(function () {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };
    this.resume = resume;
  }
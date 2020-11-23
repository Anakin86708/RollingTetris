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
function desenhaBoard(ctx, board, linhas, colunas) {
    for (let linhaAtual = 0; linhaAtual < linhas; linhaAtual++) {
        for (let colunaAtual = 0; colunaAtual < colunas; colunaAtual++) {
            const corAtualCelula = board[linhaAtual][colunaAtual]; // pega a cor de cada quadradinho
            desenhaQuadrado(ctx, linhaAtual, colunaAtual, corAtualCelula);
        }
    }
}

// desenha de fato as células no nosso board.
function desenhaQuadrado(ctx, y, x, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x * TAMANHO_BLOCO, y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);

    if (cor == corPadrao) {
        ctx.strokeStyle = bordaPadrao;
    }

    ctx.strokeRect(x * TAMANHO_BLOCO, y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
}

function setTamanhoBloco(qtdLinhas) {
    // 1 determine o menor tamanho
    const width = document.getElementById('game').offsetWidth;
    const height = document.getElementById('game').clientHeight - 100;
    // 2 veja quantos blocos vai querer
    const minSize = width < height ? width : height;
    console.log("Min size: " + minSize);
    
    // 3 calcule o tamanho de acordo
    return parseInt(minSize / qtdLinhas);
}


function resize() {
    TAMANHO_BLOCO = setTamanhoBloco(ROWS);
    canvas.height = document.getElementById('game').offsetHeight - 100;
    canvas.width = TAMANHO_BLOCO * COLS;

    console.log("Width: " + canvas.width);
    console.log("Height: " + canvas.height);
}

function blocoParaCoordenada(posBloco) {
    /*
    Converte valores da matriz (unidade do jogo) para a respectiva coordenada
    considerando o tamanho de um bloco 
    */
    return posBloco * TAMANHO_BLOCO;
}

function resetPecas() {
    /*
    Usado para reiniciar pecas quando for necessário criar uma nova peça no
    inicio do tabuleiro
    Cria uma nova peça na posição inicial que será exibida
    e passa a proxima peça para o tabuleiro de game
    */    
    //Peça movimentavel será a peçaProxima
    peca = pecaProxima;
    //Nova peça sendo criada para mostrar a proxima peça
    pecaProxima = new Peca();
}

function resetBoard() {
    /*
    Configura inicialmente o tabuleiro principal do game
    */
    // Setup inicial de board
    let board = [];
    // Desenhando fundo do board
    for (let linhaAtual = 0; linhaAtual < ROWS; linhaAtual++) {
        board[linhaAtual] = [];
        for (let colunaAtual = 0; colunaAtual < COLS; colunaAtual++) {
            board[linhaAtual][colunaAtual] = corPadrao; // Preenche com as cores do board
        }
    }
    return board;
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

function gerarCores() {
    /*
    Valores de cor de acordo com a paleta selecionada no CSS
    Necessário para a acessibilidade!
    */
   loadCookieStyle();
    const purple = getComputedStyle(document.documentElement).getPropertyValue('--main-purple');
    const red = getComputedStyle(document.documentElement).getPropertyValue('--secondary-red');
    const orange = getComputedStyle(document.documentElement).getPropertyValue('--secondary-orange');
    const yellow = getComputedStyle(document.documentElement).getPropertyValue('--secondary-yellow');
    const green = getComputedStyle(document.documentElement).getPropertyValue('--secondary-green');
    const blue = getComputedStyle(document.documentElement).getPropertyValue('--secondary-blue');
    const secPurple = getComputedStyle(document.documentElement).getPropertyValue('--secondary-purple');

    return {
        PURPLE: purple,
        RED: red,
        ORANGE: orange,
        YELLOW: yellow,
        GREEN: green,
        BLUE: blue,
        SEC_PURPLE: secPurple
    }

}

function descerTabuleiro(linMin) {
    for(let lin = linMin; lin > 0; lin--) {
        // Passa por todas as linhas do tabuleiro
        board[lin] = board[lin-1];
    }
    
    // Cria uma nova linha superior
    for (let col = 0; col < COLS; col++) {
        board[0][col] = corPadrao;
    }
}

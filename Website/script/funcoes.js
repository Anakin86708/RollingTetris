function playPause() {
    if (document.getElementById('playPause').src == "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png") {
        //O jogo é pausado
        document.getElementById('playPause').src = "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png";
        timer.pause();
        statusPause = true;
        clearInterval(tempoTotalPartida);
    }
    else if (document.getElementById('playPause').src == "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png") {
        //O jogo continua
        document.getElementById('playPause').src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png"
        timer.resume();
        statusPause = false;
        comecaTempoJogo();
    }
}

//Inicia a contagem do tempo de partida
function comecaTempoJogo() {
    tempoTotalPartida = setInterval(() => { tempoPartida(); }, 1000);
}

//Realiza a contagem do tempo de partida
function tempoPartida() {
    segundo += 1;
    if (segundo == 60) {
        minuto += 1;
        segundo = 0;
        document.getElementById('tempo').innerHTML = minuto + 'm : ' + segundo + 's';
    }
    else {
        document.getElementById('tempo').innerHTML = minuto + 'm : ' + segundo + 's';
    }

}

// função para escolher opção do tamanho
function trocaLinhas() {
    var status = document.getElementById("tamanho-jogo").textContent;
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
function desenhaBoard(ctx, board, linhas, colunas, bloco) {
    for (let linhaAtual = 0; linhaAtual < linhas; linhaAtual++) {
        for (let colunaAtual = 0; colunaAtual < colunas; colunaAtual++) {
            const corAtualCelula = board[linhaAtual][colunaAtual]; // pega a cor de cada quadradinho
            desenhaQuadrado(ctx, linhaAtual, colunaAtual, corAtualCelula, bloco);
        }
    }
}

// desenha de fato as células no nosso board.
function desenhaQuadrado(ctx, y, x, cor, bloco) {
    ctx.fillStyle = cor;
    ctx.fillRect(x * bloco, y * bloco, bloco, bloco);

    if (cor == corPadrao) {
        ctx.strokeStyle = bordaPadrao;
    }

    ctx.strokeRect(x * bloco, y * bloco, bloco, bloco);
}

function setTamanhoBloco(elemID, qtdLinhas) {
    // 1 determine o menor tamanho
    const width = document.getElementById(elemID).offsetWidth;
    const height = document.getElementById(elemID).clientHeight - 100;
    // 2 veja quantos blocos vai querer
    const minSize = width < height ? width : height;
    console.log("Min size: " + minSize);

    // 3 calcule o tamanho de acordo
    return parseInt(minSize / qtdLinhas);
}


function resize() {
    TAMANHO_BLOCO = setTamanhoBloco('game', ROWS);
    canvas.height = document.getElementById('game').offsetHeight - 100;
    canvas.width = TAMANHO_BLOCO * COLS;

    console.log("Width: " + canvas.width);
    console.log("Height: " + canvas.height);
}

function blocoParaCoordenada(posBloco, bloco) {
    /*
    Converte valores da matriz (unidade do jogo) para a respectiva coordenada
    considerando o tamanho de um bloco 
    */
    return posBloco * bloco;
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
    peca.x = parseInt(COLS / 2) - 1;
    //Nova peça sendo criada para mostrar a proxima peça
    pecaProxima = new Peca(5);
    // Mantem o tamanho correto de prox
    // pecaProxima.y = 0;
    // pecaProxima.x = -4;
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
            remaining = tickGame;
            resume();
            callback();
        }, tickGame);
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
    const especial = getComputedStyle(document.documentElement).getPropertyValue('--neutral-white');

    return {
        PURPLE: purple,
        RED: red,
        ORANGE: orange,
        YELLOW: yellow,
        GREEN: green,
        BLUE: blue,
        SEC_PURPLE: secPurple,
        ESPECIAL: especial
    }

}

function descerTabuleiro(linMin) {
    for (let lin = linMin; lin > 0; lin--) {
        // Passa por todas as linhas do tabuleiro
        board[lin] = board[lin - 1];
    }

    // Cria uma nova linha superior
    for (let col = 0; col < COLS; col++) {
        board[0][col] = corPadrao;
    }
}

function somaPontos() {
    var linhaQuebrada = 10;
    //Atualização da quantidade de pontos exibidos
    POINTS += linhaQuebrada;
    document.getElementById('pontos').innerHTML = POINTS;
    //Atualização da quantidade de linhas quebradas
    quantLinhas += 1;
    document.getElementById('linhas').innerHTML = quantLinhas;
    return linhaQuebrada;
}

function ativaBonus(quant, pontos) {
    // console.log('Ponto acumulado: ' + pontos + 'quant: ' + quant);
    // console.log('POINTS: ' + POINTS);
    //Calculo e atualização da pontuação bônus
    var somatorio = pontos * (quant - 1);
    POINTS += somatorio;
    document.getElementById('pontos').innerHTML = POINTS;
}

// função tempo 
function alterarTick(x) {
    // Função de autoria própria
    let BASETICK = 1000;
    return BASETICK * Math.pow(Math.E, (-0.1 * x));
}

function animacao(elemID, name) {
    const elem = document.getElementById(elemID);
    elem.style.animationPlayState = 'running';
    elem.classList.remove(name);
    void elem.offsetWidth;
    elem.classList.add(name);
}

function gameOver()
{
    clearInterval(tempoTotalPartida); /* pausa tempo */
    document.getElementById('gameover').style.visibility = 'visible';
    perdeu = true;
}

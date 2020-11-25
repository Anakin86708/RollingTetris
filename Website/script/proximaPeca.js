// Define a proxima peça que será disponibilizada ao jogador
var pecaProxima = new Peca(5);
var TAMANHO_BLOCO_NEXT;
var nextBoard;

function criaCanvasProx(context) {
    /*
    Configura o tabuleior que será exibido a próxima peça
    */
    const coluna = 5;  // Quantidade de colunas do tabuleiro de próxima peça
    const linha = 8;  // Quantidade de linhas do tabuleiro de próxima peça

    let canvas = document.getElementById('prox-piece');
    TAMANHO_BLOCO_NEXT = 30;
    canvas.width = coluna * TAMANHO_BLOCO_NEXT;
    canvas.height = linha * TAMANHO_BLOCO_NEXT;

    nextBoard = [];
    for(l = 0; l < linha; l++){
        nextBoard[l] = []
        for(c = 0; c < coluna; c++){
            nextBoard[l][c] = corPadrao;
        }
    }
    // Cria o background do nextBoard
    desenhaBoard(context, nextBoard, linha, coluna, TAMANHO_BLOCO_NEXT);
}

function pintaPecaProxima(context) {
    pecaProxima.valueOf().forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                nextBoard[y + pecaProxima.y + 6][x + pecaProxima.x] = pecaProxima.cor;
            }
        });
    });
    desenhaBoard(context, nextBoard, 8, 5, TAMANHO_BLOCO_NEXT);
}


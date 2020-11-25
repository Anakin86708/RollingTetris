// Define a proxima peça que será disponibilizada ao jogador
var pecaProxima = new Peca(5);
var TAMANHO_BLOCO_NEXT;

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

    let nextBoard = [];
    for(l = 0; l < linha; l++){
        nextBoard[l] = []
        for(c = 0; c < coluna; c++){
            nextBoard[l][c] = corPadrao;
        }
    }
    desenhaBoard(context, nextBoard, linha, coluna, TAMANHO_BLOCO_NEXT);
}


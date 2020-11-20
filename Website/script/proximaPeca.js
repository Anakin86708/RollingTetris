// Define a proxima peça que será disponibilizada ao jogador
var pecaProxima = new Peca();

function criaCanvasProx(context) {
    /*
    Configura o tabuleior que será exibido a próxima peça
    */
    const coluna = 5;  // Quantidade de colunas do tabuleiro de próxima peça
    const linha = 8;  // Quantidade de linhas do tabuleiro de próxima peça

    let canvas = document.getElementById('prox-piece');
    canvas.width = coluna * TAMANHO_BLOCO;
    canvas.height = linha * TAMANHO_BLOCO;

    let nextBoard = [];
    for(l = 0; l < linha; l++){
        nextBoard[l] = []
        for(c = 0; c < coluna; c++){
            nextBoard[l][c] = corPadrao;
        }
    }
    desenhaBoard(context, nextBoard, linha, coluna);
}


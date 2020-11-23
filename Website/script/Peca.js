'use strict';

const qtdTipos = 7;
const cores = gerarCores();

// define os tipos de peças que caem 
const tipos = {
    LINHA: [
        [1],
        [1],
        [1],
        [1]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
    ],
    L_INFERIOR: [
        [1, 0],
        [1, 0],
        [1, 1],
    ],
    L_SUPERIOR: [
        [0, 1],
        [0, 1],
        [1, 1],
    ],
    U: [
        [1, 0, 1],
        [1, 1, 1],
    ],
    CUBO: [
        [1, 1],
        [1, 1],
    ],
    ESPECIAL: [
        [1]
    ]
}

class Peca {
    constructor() {
        this._tipo = this.gerarTipo();
        this._orientacaoOriginal = true;
        this.x = parseInt(COLS / 2) - 1;
        this.y = (-1 * this.altura) - 1;  // Permite que a peça seja gerada antes do tabuleiro visual
        this._cor = this.escolherCor();
    }
    get tipo() { return this._tipo; }

    set tipo(value) { this._tipo = value; }

    // Retorna a largura da peça atual
    get largura() { return this._tipo[0].length; }

    // Retorna a altura da peça atual
    get altura() { return this._tipo.length; }

    get cor() { return this._cor; }

    set x(x) { this._x = x; }

    get x() { return this._x; }

    set y(y) { this._y = y; }

    get y() { return this._y; }

    gerarTipo() {
        let index = 0;
        const limite = this.gerarRandom(0, qtdTipos);
        for (let item in tipos) {
            if (index++ === limite) {
                return tipos[item];
            }
        }
    }
    escolherCor() {
        let index = 0;
        const limite = this.gerarRandom(0, 7);  // CASO NOVAS CORES SEJAM ADICIONADAS DEVE SER ALTERADO AQUI
        for (let item in cores) {
            if (index++ === limite) {
                return cores[item];
            }
        }
    }

    gerarRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    rotacionar() {
        var rotate;
        // Necessário repensar a forma de rotação das peças
        this.transpor();
        if (!this._orientacaoOriginal) {
            // Se necessário, inverte a matriz
            this._tipo.reverse();
        }
    
        // Verificar se ultrapassou o tabuleiro
        while (this.x + this.largura > COLS) {
            this.x--;
        }

        // Verificar se ultrapassou o tabuleiro
        while (this.x + this.largura > COLS) {
            this.x--;
        }

        this._orientacaoOriginal = !this._orientacaoOriginal;
    }

    transpor() {
        const linhas = this._tipo.length;
        const colunas = this._tipo[0].length;
        const rotate = new Array();
        const matriz = this._tipo;

        for (let col = 0; col < colunas; col++) {
            rotate.push(new Array());
            for (let lin = 0; lin < linhas; lin++) {
                rotate[col].push(matriz[lin][col]);
            }
        }
        this._tipo = rotate;
    }

    descerPeca() {
        // Verifica antes de desenhar se é possiver avançar
        if (!peca.colisorInferior(board)) {
            // Peça colide com a inferior e é printada na tela
            peca.pintaPecaBoard(board);
            resetPecas();
        } else {
            // Consegue descer
            peca.y += 1;
            desenha();
        }
    }

    // COLISÃO
    colisorInferior(board) {
        if (this.y + this.altura < -1) {
            // Ignora o início - peça ainda não está no board
            return true;
        }
        if (this.y + this.altura == ROWS) {
            // Chegou no fim
            console.log('Bateu no fim!');
            return false;
        }
        // Verificar na matriz com peças fixas se é possível descer
        // Os pontos de colisão de cada peça devem ser o primeiro elemento com 1 de cada coluna da matriz da peça, começando de baixo
        try {
            for (let col = 0; col < this.largura; col++) {
                for (var row = this.altura - 1; row >= 0; row--) {
                    // Encontar o ponto mais baixo
                    if (this.tipo[row][col] == 1) {
                        break;
                    }
                }
                // Verificar se é possivel avançar
                let corBaixo = board[this.y + row + 1][this.x + col];
                if (corBaixo != corPadrao) {
                    // COLISÃO
                    console.log('BATEU!');
                    return false;
                }
            }
            // Não houve colisão
            return true;
        } catch (error) {
            console.log("erro");
            if (this.y + this.altura == ROWS) {
                // Chegou no fim
                console.log('Bateu no fim!');
                return false;
            }
            return true; // Peça fora do board
        }
    }

    colisorLateral(board, movingToRight) {
        if (this.y < -this.altura || this.y < 0) {
            // Ignora o início
            return true;
        }
        if (movingToRight) {
            // Para o movimento a direita, verificar toda a última coluna
            for (let lin = 0; lin < this.altura; lin++) {
                let corDifeita = board[this.y + lin][this.x + this.largura];  // Não é necessário incrementar 1, pois largura já está com incremento
                if (corDifeita != corPadrao) {
                    // COLISÃO
                    return false;
                }
            }
            return true;

        } else {
            // Para o movimento a esquerda, verificar toda coluna 0
            for (let lin = 0; lin < this.altura; lin++) {
                let corEsquerda = board[this.y + lin][this.x - 1];
                if (corEsquerda != corPadrao) {
                    // COLISÃO
                    return false;
                }
            }
            return true;
        }
    }

    colisorLateral(board, movingToRight) {
        if(this.y<-this.altura || this.y < 0){
            // Ignora o início
            return true;
        }
        if(movingToRight) {
            // Para o movimento a direita, verificar toda a última coluna
            for (let lin = 0; lin < this.altura; lin++) {
                let corDifeita = board[this.y + lin][this.x + this.largura];  // Não é necessário incrementar 1, pois largura já está com incremento
                if (corDifeita != corPadrao) {
                    // COLISÃO
                    return false;
                }
            }
            return true;
            
        } else {
            // Para o movimento a esquerda, verificar toda coluna 0
            for(let lin = 0; lin < this.altura; lin++) {
                let corEsquerda = board[this.y + lin][this.x - 1];
                if (corEsquerda != corPadrao) {
                    // COLISÃO
                    return false;
                }
            }
            return true;
        }
    }

    pintaPecaBoard(board) {
        // Desenha peça no fundo do tabuleiro
        try {
            this.valueOf().forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value != 0) {
                        board[y + this.y][x + this.x] = this.cor;
                    }
                });
            });
            // Verificar posição máxima se excede o tabuleiro
            if (this.y <= 0) {
                alert('End game!');
            }
        } catch (e) {
            console.log('Erro ao pintaPecaBoard');
            if (this.y <= 0) {
                alert('End game!');
            }
            // this.y--;
        }
    }

    desenhanNoCanvas(context, xMargem = 0, yMargem = 0) {
        this.valueOf().forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillStyle = this.cor;
                    context.fillRect(blocoParaCoordenada(x + this.x + xMargem), blocoParaCoordenada(y + this.y + yMargem), TAMANHO_BLOCO, TAMANHO_BLOCO);
                }
            });
        });
    }

}

Peca.prototype.valueOf = function () {
    return this._tipo;
};
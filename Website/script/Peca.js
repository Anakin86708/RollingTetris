'use strict';

const qtdTipos = 7;

// define os tipos de peças que caem 
const tipos = {
    LINHA: [
        [1],
        [1],
        [1],
        [1]
    ],
    T: [
        [0,1,0],
        [1,1,1],
    ],
    L_INFERIOR: [
        [1,0],
        [1,0],
        [1,1],
    ],
    L_SUPERIOR: [
        [1,1],
        [1,0],
        [1,0],
    ],
    U: [
        [1,0,1],
        [1,1,1],
    ],
    CUBO: [
        [1,1],
        [1,1],
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
    }
    get tipo() { return this._tipo;}

    set tipo(value) {this._tipo = value;}

    // Retorna a largura da peça atual
    get largura() { return this._tipo[0].length; }
    
    // Retorna a altura da peça atual
    get altura() { return this._tipo.length;}

    set x(x) { this._x = x; }

    get x() { return this._x;}

    set y(y) { this._y = y; }

    get y() { return this._y;}

    gerarTipo() {
        let index = 0;
        const limite = this.gerarRandom(0, qtdTipos);
        for (let item in tipos) {
            if (index++ === limite) {
                return tipos[item];
            }
        }
    }    

    gerarRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    rotacionar() {
        var rotate;
        this.transpor();
        if (!this._orientacaoOriginal){
            // Se necessário, inverte a matriz
            this._tipo.reverse();
        }

        this._orientacaoOriginal = !this._orientacaoOriginal;
    }

    transpor(){
        const linhas = this._tipo.length;
        const colunas = this._tipo[0].length;
        const rotate = new Array();
        const matriz = this._tipo;
        
        for (let col = 0; col < colunas; col++) {
            rotate.push(new Array());
            for (let lin = 0; lin < linhas;lin++) {
                rotate[col].push(matriz[lin][col]);
            }
        }
        this._tipo = rotate;
    }

    colisorInferior(board) {
        if(this.y<-this.altura || this.y < 0){
            // Ignora o início
            return true;
        }
        console.log(this.y+this.altura);
        if(this.y + this.altura == ROWS) {
            // Chegou no fim
            console.log('Bateu no fim!');
            // this.pintaPecaBoard(board);
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
                console.log('Cor em [' + (this.y + row + 1) + ']['+ (this.x + col) + ']: ' + corBaixo);
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
            if(this.y + this.altura == ROWS) {
                // Chegou no fim
                console.log('Bateu no fim!');
                // this.pintaPecaBoard(board);
                return false;
            }
            // continue;
        }
    }

    pintaPecaBoard(board) {
        this.valueOf().forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    board[y + this.y][x + this.x] = '#00f';
                }
            });
        });
    }

    desenhaDinamico(context, cor, xMargem=0, yMargem=0) {
        this.valueOf().forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillStyle = cor;
                    context.fillRect(blocoParaCoordenada(x + this.x + xMargem), blocoParaCoordenada(y + this.y + yMargem), TAMANHO_BROCO, TAMANHO_BROCO);
                }
            });
        });
    }

    //Print no canvas à direita da próxima Peça
    geraListaQuadrado()
    {
        for(let r=  0; r < this.largura; r++){
            for(let c = 0; c<this.altura; c++){
                console.log('O valor da largura é: '+ this.largura);
                console.log('O valor da altura é: '+ this.altura);
                if(this.tipo[r][c] == 1){
                    proxDesenhaQuadrado(r + 1,c + 2,'red');
                }
            }
        }
    }

}

// Onde devo colocar isso daqui??
Peca.prototype.valueOf = function () {
    return this._tipo;
};
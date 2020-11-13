'use strict';

const qtdTipos = 7;
const tipos = {
    LINHA: [
        [1,1,1,1]
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
    }
    get tipo() { return this._tipo;}

    set tipo(value) {this._tipo = value;}
    
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
}

// Onde devo colocar isso daqui??
Peca.prototype.valueOf = function () {
    return this._tipo;
};
'use strict';

const qtdTipos = 7;
const tipos = {
    LINHA: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    T: [
        [0,0,0,0],
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0]
    ],
    L_INFERIOR: [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    L_SUPERIOR: [
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    U: [
        [0,0,0,0],
        [1,0,1,0],
        [1,1,1,0],
        [0,0,0,0]
    ],
    CUBO: [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    ESPECIAL: [
        [1]
    ]
}

class Peca {
    constructor() {
        this._tipo = this.gerarTipo();
        
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
        alert('GIRANDO');
        const matrix = this._tipo;
        const N = matrix.length - 1;      
        const result = matrix.map((row, i) => 
             row.map((val, j) => matrix[N - j][i])
        );
        matrix.length = 0;       // hold original array reference
        matrix.push(...result);  // Spread operator
        return matrix;
    }
}

// Onde devo colocar isso daqui??
Peca.prototype.valueOf = function () {
    return this._tipo;
};


// função para rotacionar as peças do jogo
function rotate(matrix) {  
    const N = matrix.length - 1;   // use a constant
    // use arrow functions and nested map;
    const result = matrix.map((row, i) => 
         row.map((val, j) => matrix[N - j][i])
    );
    matrix.length = 0;       // hold original array reference
    matrix.push(...result);  // Spread operator
    return matrix;
}
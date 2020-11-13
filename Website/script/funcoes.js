// função para usuário escolher opção do tamanho
function trocaLinhas(){
    var status = document.getElementById("tamanho-jogo").textContent
    console.log(status);

    if(status == '10x20'){
        document.getElementById("tamanho-jogo").innerText = '22x40';
        setTamanhoBROCO(40);
    }
    else if(status == '22x40'){
        document.getElementById("tamanho-jogo").innerText = '10x20';
        setTamanhoBROCO(20);   
    }
}

// função para trocar o usuário trocar o botão de pause e play e vice-versa
function playPause() {
    var status = document.getElementById("playPause").src;
    var corFundo = document.getElementById("botao-pp").style.backgroundColor;
    
    //Define o status do jogo como Pause 
    if(status == "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png")  // Talvez alterar para o link de imagem local
    {
        document.getElementById("playPause").src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png";  // Talvez alterar para o link de imagem local
        // corFundo = 'yellow';
    }
        
        
    //Define o status do jogo como Play
    if(status == "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png")  // Talvez alterar para o link de imagem local
        document.getElementById("playPause").src = "https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png";  // Talvez alterar para o link de imagem local
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Varre todas as linhas e colunas da nossa matriz board, pegando a cor de cada célula e chamando a função desenhaQuadrado para  desenhar de fato a célula
function desenhaBoard()
{
    for (let linhaAtual = 0; linhaAtual < ROWS; linhaAtual++)
    {
        for (let colunaAtual = 0; colunaAtual < COLS; colunaAtual++)
        {
            const corAtualCelula = board[linhaAtual][colunaAtual] // pega a cor de cada quadradinho
            
            desenhaQuadrado(linhaAtual, colunaAtual, corAtualCelula) 
        }
    }
}

// desenha de fato as células no nosso board.
function desenhaQuadrado(y, x, cor)
{
    context.fillStyle = cor
    context.fillRect(x * TAMANHO_BROCO, y * TAMANHO_BROCO, TAMANHO_BROCO, TAMANHO_BROCO)

    if (cor == corPadrao)
    {
        context.strokeStyle = bordaPadrao
    }

    context.strokeRect(x * TAMANHO_BROCO, y * TAMANHO_BROCO, TAMANHO_BROCO, TAMANHO_BROCO)
}   

function setTamanhoBROCO(qtdLinhas) {
    // 1 determine o menor tamanho
    // 2 veja uantos brocos vai querer
    // 3 calcule o tamanho de acordo
    const width = document.getElementById('game').offsetWidth;
    const height = document.getElementById('game').clientHeight-100;
    const minSize = width < height ? width : height;
    console.log("Min size: " + minSize);

    return parseInt(minSize /qtdLinhas);
}


function resize() {
    TAMANHO_BROCO = setTamanhoBROCO(ROWS);
    canvas.height = document.getElementById('game').offsetHeight-100;
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
    inicial_x = parseInt(COLS / 2)-1;
    inicial_y = -1;
    peca = new Peca();
}

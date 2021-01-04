<?php
    session_start();
    if(!isset($_SESSION['logado']))
    {
        header("Location: index.html");
    }
    else{
      
    ?>

        <!DOCTYPE html>
        <html lang="pt">

        <head>
            <meta charset="UTF-8">
            <link rel="shortcut icon" href="images/icon.png">
            <link rel="stylesheet" href="css/global.css">
            <link rel="stylesheet" href="css/game.css">
            <link id="colorsCSS" rel="stylesheet" type="text/css" href="css/colors/default.css">
            <script src="script/default.js"></script>
            <title>Rolling Tetris</title>
        </head>

        <body onresize="resize()" onload="onLoad()">

            <div class="container">
                <header>
                    <div>
                        <a href="game.php"><img src="images/logo-peq.png" alt="logo do tetris rolling"></a>
                    </div>
                </header>

                <main>
                    <div class="default-div user-panel">
                        <div class="header-panel">
                            <div class="item-01">
                                <img class="default-avatar" src="images/sample-avatar.bmp" alt="Foto de perfil do usuário">
                                <div class="user-name">
                                    Nome de usuário
                                </div>
                            </div>

                            <div class="edit-logout">
                                <div class="logout">
                                    <a href="backend/logout.php">Logout</a>
                                </div>
                                <div class="edit">
                                    <a href="edit_info.html">Editar informações</a>
                                </div>
                            </div>
                        </div>

                        <div class="match-info">
                            <h2 class="info-title">Informações da partida</h2>
                            <ul class="gen-info">
                                <li class="item">
                                    Tempo: <div id="tempo"></div>
                                </li>

                                <li class="item">
                                    Pontuação: <div id="pontos">0</div>
                                </li>

                                <li class="item">
                                    Linhas quebradas: <div id="linhas">0</div>

                                </li>

                                <li class="item">
                                    Dificuldade: <div id="dificuldade"></div>
                                </li>
                            </ul>
                        </div>

                        <div id="controles" class="controles">
                            <h2 class="info-title">Controles</h2>
                            <ul id="info-controles">
                                <!-- GERADO PELO JS -->
                            </ul>
                        </div>

                    </div>

                    <div id="game" class="default-div game">
                        <!-- <img class="img-demo" src="images/sample-game-menu.png" alt="imagem de tetris"> -->
                        <div class="jogoTetris">
                            <canvas id="tetris" class="default-div game-canvas"></canvas>
                            <div id="gameover">
                                <span id="texto">Game Over!</span>
                                <span id="score">Sua pontuação foi: </span>
                                <div id="gameover-botoes">
                                    <!-- <img src="images/home-cion.png" alt="" id="home"> -->
                                    <img src="images/restart-icon.png" alt="icone-reiniciar" id="restart" onclick="restart()">
                                </div>
                            </div>
                        </div>

                        <!--Painel à direita do jogo que avisa ao usuário as próximas peças -->
                        <div class="game-painel">
                            <!--Nesse daqui, identificamos o cabeçalho do jogo-->
                            <div class="cabecalho">
                                <h3>Próxima peça</h3>
                            </div>
                            <!--Aqui é o local que as próximas peças irão entrar-->
                            <div class="lista-pecas" id="lista-piece">
                                <canvas id='prox-piece' class="prox-piece"></canvas>
                            </div>
                            <!--Botão-->
                            
                            <div class="opcao-tamanho">
                                <!--chamar função para trocar o tamanho -->
                                <div onclick="trocaLinhas()">
                                    <h3 id="tamanho-jogo">10x20</h3>
                                </div>
                            </div>
                            
                            <div class="game-botao">
                                    <!-- <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/08/Figura-Play-PNG-1200x1200.png" alt="Play" width="100%" height="100%" class="dot" id="playPause"> -->
                                    <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png" alt="Play"  class="dot" id="playPause">
                            </div>
                        </div>
                    </div>

                    <!--Inicio - Ranking-->

                    <div class="rank-panel">
                        <h2>Ranking</h2>
                        <div class="default-div ranking">
                            <!-- default-div ranking-->

                            <table>
                                <tr>
                                    <th>Nome</th>
                                    <th>Pontuação</th>
                                    <th>Nível</th>
                                    <th>Tempo</th>
                                </tr>

                                <tr>
                                    <td>Ariel</td>
                                    <td>1000000</td>
                                    <td>57</td>
                                    <td>00h:35m:10s</td>
                                </tr>
                                <tr>
                                    <td>Enzo</td>
                                    <td>100000</td>
                                    <td>27</td>
                                    <td>00h:30m:10s</td>
                                </tr>
                                <tr>
                                    <td>Leonardo</td>
                                    <td>10000</td>
                                    <td>19</td>
                                    <td>00h:25m:10s</td>
                                </tr>
                                <tr>
                                    <td>Guilherme</td>
                                    <td>1000</td>
                                    <td>7</td>
                                    <td>00h:09m:10s</td>
                                </tr>
                            </table>
                            <div class="world-ranking">
                                <a class="btn-global" href="rank.html">RANKING GLOBAL</a>
                            </div>
                        </div>
                    </div>
                    <!--Final - Ranking-->

                </main>

                <footer>
                    <b>Gaveta Filmes - Web</b>. <br>
                    SI401B - Programação para a Web, Unicamp, 2020.
                    <audio src="./sounds/theme.mp3" autoplay loop>
                        <p>If you are reading this, it is because your browser does not support the audio element.</p>
                    </audio>                
                </footer>
            </div>
            <script src="script/funcoes.js"></script>
            <script src="script/Peca.js"></script>
            <script src="script/game.js"></script>
            <script src="script/proximaPeca.js"></script>
        </body>

        </html>
    
<?php
    }
?>
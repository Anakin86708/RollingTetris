<?php
    session_start();

    if(!isset($_SESSION['logado']))
    {
        header('location: index.html');
    }
    else{
        include_once 'backend/conexao.php';

        $conn = getNewConnection();
        $stmt = $conn->query("SELECT pe.nome, MAX(pa.pontuacao) AS pontuacao, pa.dificuldade, pa.tempoPartida, pe.cpf FROM pessoa pe INNER JOIN partida pa ON pe.cpf = pa.cpfJogador GROUP BY nome ORDER BY MAX(pa.pontuacao) DESC LIMIT 10");
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <title>Rolling Tetris - Global Rank</title>
    <link rel="shortcut icon" href="images/icon.png">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/rank.css">
    <link id="colorsCSS" rel="stylesheet" type="text/css" href="css/colors/default.css">
    <script src="script/default.js"></script>
</head>

<body onload="onLoad()">
    <div class="container">
        <header>
            <div class="back-button">
                <!-- <a href="game.php"><button>VOLTAR</button></a> -->
                <a class="btn-global" href="game.php">VOLTAR</a>
            </div>
            <div class="tetris-logo">
                <a href="game.php"><img src="images/logo-peq.png" alt="logo do tetris rolling"></a>
            </div>
        </header>

        <main>
            <div class="container-main">

                <div class="title">
                    <h1>Ranking Global</h1>
                </div>

                <div class="default-div ranking">
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Pontuação</th>
                            <th>Nível</th>
                            <th>Tempo</th>
                        </tr>

                        <?php     
                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
                            {
                                $tempo = $row['tempoPartida'];
                                
                                $minuto = intval($tempo/60);
                                $segundos = $tempo - ($minuto * 60);

                                $tempo = $minuto . "m" . $segundos . "s";
                                
                                echo "<tr><td>{$row['nome']}</td><td>{$row['pontuacao']}</td><td>{$row['dificuldade']}</td><td>{$tempo}</td>";
                            }
                        ?>
                        
                    </table>
                </div>
            </div>
        </main>

        <footer>
            <b>Gaveta Filmes - Web</b>. <br>
            SI401B - Programação para a Web, Unicamp, 2020.
        </footer>
    </div>
</body>

</html>

<?php } ?>
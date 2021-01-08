<?php
    session_start();

    if(!isset($_SESSION['logado']))
    {
        header('location: index.html');
    }
    else{
        include_once 'backend/conexao.php';

        $conn = getNewConnection();

        $stmt = $conn->query("SELECT pe.nome, MAX(pa.pontuacao) AS pontuacao, pa.dificuldade, pa.tempoPartida, pe.cpf FROM pessoa pe INNER JOIN partida pa ON pe.cpf = pa.cpfJogador GROUP BY nome ORDER BY MAX(pa.pontuacao) DESC");
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
                            <th>Posição</th>
                            <th>Pontuação</th>
                            <th>Nível</th>
                            <th>Tempo</th>
                        </tr>

                        <?php
                            $check = 0;
                            $contagem = 0;
                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
                            {
                                $tempo = $row['tempoPartida'];
                                
                                $minuto = intval($tempo/60);
                                $segundos = $tempo - ($minuto * 60);

                                $tempo = $minuto . "m" . $segundos . "s";
                                
                                $contagem += 1;
                                if($row['nome'] == $_SESSION['nome']) {
                                    echo"<tr class='user-position'><td>{$row['nome']}</td><td>$contagem</td><td>{$row['pontuacao']}</td><td>{$row['dificuldade']}</td><td>{$tempo}</td></tr>";
                                    $check = 1;
                                }
                                else {
                                    echo"<tr><td>{$row['nome']}</td><td>$contagem</td><td>{$row['pontuacao']}</td><td>{$row['dificuldade']}</td><td>{$tempo}</td></tr>";
                                }
                                if($contagem == 10) {
                                    break;
                                }
                            }
                            if($check == 0) {
                                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                                    $contagem += 1;
                                    if($row['nome'] == $_SESSION['nome']) {
                                        echo"<tr class='user-position'><td>{$row['nome']}</td><td>$contagem</td><td>{$row['pontuacao']}</td><td>{$row['dificuldade']}</td><td>{$tempo}</td></tr>";   
                                    }
                                }
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
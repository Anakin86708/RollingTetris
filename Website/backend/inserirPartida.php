<?php
require_once('conexao.php');

saveGameDataOnDB();

function saveGameDataOnDB()
{
    $conn = getNewConnection();
    $gameData = getCurrentGameData();

    $sql = "INSERT INTO partida (idPartida, cpfJogador, tempoPartida, pontuacao, linhasEliminadas, dificuldade) VALUES (DEFAULT, :cpfJogador, :tempoPartida, :pontuacao, :linhasEliminadas, :dificuldade)";
    $stm = $conn->prepare($sql);
    $stm->execute($gameData);

    if ($stm->rowCount() > 0) {
        echo "Dados da partida inseridos com sucesso!<br>";
    }  else {
        echo "Erro!!<br>";
    }
    print_r($gameData);
}

function getCurrentGameData()
{
    return array(
        "cpfJogador" => $_POST["cpfJogador"]."",
        "pontuacao" => $_POST["pontuacao"],
        "dificuldade" => $_POST["dificuldade"],
        "linhasEliminadas" => $_POST["linhasEliminadas"],
        "tempoPartida" => getTempoPartida($_POST),
    );
}

function getTempoPartida($data)
{
    return $data['minuto'] * 60 + $data['segundo'];
}

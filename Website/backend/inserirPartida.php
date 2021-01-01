<?php
require_once('conexao.php');

saveGameDataOnDB($_POST);

function saveGameDataOnDB($data)
{
    $conn = getNewConnection();
    $gameData = getGameData($data);

    $sql = "INSERT INTO partida (idPartida, cpfJogador, tempoPartida, pontuacao, linhasEliminadas, dificuldade) VALUES (NULL, :cpfJogador, :tempoPartida, :pontuacao, :linhasEliminadas, :dificuldade)";
    $stm = $conn->prepare($sql);
    $stm->execute($gameData);
    echo "Dados da partida inseridos com sucesso!<br>";
    print_r($gameData);
}

function getGameData($data)
{
    return array(
        "cpfJogador" => $data["cpfJogador"]."",
        "pontuacao" => $data["pontuacao"],
        "dificuldade" => $data["dificuldade"],
        "linhasEliminadas" => $data["linhasEliminadas"],
        "tempoPartida" => getTempoPartida($data),
    );
}

function getTempoPartida($data)
{
    return $data['minuto'] * 60 + $data['segundo'];
}

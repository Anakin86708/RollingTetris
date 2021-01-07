<?php
require_once('conexao.php');
session_start();
    if(!isset($_SESSION['logado']))
    {
        header("Location: index.html");
    }
saveGameDataOnDB($_POST);

function saveGameDataOnDB($data)
{
    $conn = getNewConnection();
    $gameData = getCurrentGameData($data);

    $sql = "INSERT INTO partida (idPartida, cpfJogador, tempoPartida, pontuacao, linhasEliminadas, dificuldade) VALUES (DEFAULT, :cpfJogador, :tempoPartida, :pontuacao, :linhasEliminadas, :dificuldade)";
    $stm = $conn->prepare($sql);
    $stm->execute($gameData);

    if ($stm->rowCount() > 0) {
        echo "Dados da partida inseridos com sucesso!<br>";
    }  else {
        echo "Erro!!";
        die();
    }
}

function getCurrentGameData($data)
{
    return array(
        "cpfJogador" => $_SESSION['cpf'],
        "pontuacao" => $data['pontuacao'],
        "dificuldade" => $data['dificuldade'],
        "linhasEliminadas" => $data['linhasEliminadas'],
        "tempoPartida" => getTempoPartida($data),
    );
}

function getTempoPartida($data)
{
    return $data['minuto'] * 60 + $data['segundo'];
}

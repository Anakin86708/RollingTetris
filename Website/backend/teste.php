<?php

print_r($_POST);

function saveGameDataOnDB($data)
{
    
}

function getGameData($data)
{
    return array(
        "pontuacao" => $data["pontuacao"],
        "linhas" => $data["linhas"],
        "dificuldade" => $data["dificuldade"],
        "linhasEliminadas" => $data["linhasEliminadas"],
        "tempoPartida" => getTempoPartida($data),
    );
}

function getTempoPartida($data)
{
    return $data['minuto'] . ":" . $data['segundo'];
}

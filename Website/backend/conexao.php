<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tetris";

    function getNewConnection() {
        global $servername, $username, $password, $dbname;
        try {
            return new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
        } catch (PDOException $e) {
            echo "Ocorreu um erro na conexão com o Banco de Dados: " . $e->getMessage();
            return null;
        }
    }

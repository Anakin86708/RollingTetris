<?php 
    include_once 'conexao.php';

    criaBD($servername, $username, $password);
    criaTable($servername, $dbname, $username, $password);

    function criaBD($servername, $username, $password)
    {
        try {
            $conn = new PDO("mysql:host=$servername;", $username, $password);
        } catch (PDOException $e) {
            echo "Ocorreu um erro na criação do Banco de Dados: " . $e->getMessage();
        }

        $sql = "CREATE DATABASE usuarios DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;";
        $conn->exec($sql);
    }

    function criaTable($servername, $dbname, $username, $password)
    {
        try {
            $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);

            $sql = "CREATE TABLE IF NOT EXISTS pessoa(
                nome varchar(50),
                nascimento int,
                cpf tinyint,
                telefone tinyint,
                email varchar(50),
                username varchar(50),    
                senha varchar(50),
                primary key (cpf)
            )";

            $conn->exec($sql);

            $sql = "CREATE TABLE partida(
                idPartida int auto_increment,
                tempoPartida int,
                pontuacao int,
                linhasEliminadas int,
                nivel varchar(10),
                primary key (idPartida)
            )";
    
            $conn->exec($sql);
            echo "Criado com sucesso!";

        } catch (PDOException $e) {
            echo "Ocorreu um erro na criação da tabela: " . $e->getMessage();
        }
    }
?>


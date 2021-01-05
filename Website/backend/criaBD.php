<?php 
    include_once './conexao.php';

    criaBD($servername, $username, $password, $dbname);
    criaTable($servername, $dbname, $username, $password);

    function criaBD($servername, $username, $password, $dbname)
    {
        try {
            $conn = new PDO("mysql:host=$servername;", $username, $password);
            $sql = "CREATE DATABASE $dbname DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;";
            $conn->exec($sql);
        } catch (PDOException $e) {
            echo "Ocorreu um erro na criação do Banco de Dados: " . $e->getMessage();
        }
    }

    function criaTable($servername, $dbname, $username, $password)
    {
        try {
            $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);

            $sql = "CREATE TABLE IF NOT EXISTS pessoa(
                cpf CHAR(11) NOT NULL,
                nome VARCHAR(70) NOT NULL,
                nascimento DATE NOT NULL,
                telefone CHAR(11) NOT NULL,
                email VARCHAR(100) NOT NULL,
                username VARCHAR(30) NOT NULL UNIQUE,
                senha VARCHAR(50) NOT NULL,
                PRIMARY KEY (cpf)
            )";

            $conn->exec($sql);

            $sql = "CREATE TABLE IF NOT EXISTS partida(
                idPartida INT AUTO_INCREMENT NOT NULL,
                cpfJogador char(11) NOT NULL,
                tempoPartida INT NOT NULL,
                pontuacao INT NOT NULL,
                linhasEliminadas INT NOT NULL,
                dificuldade CHAR(10) NOT NULL,
                PRIMARY KEY (idPartida),
                FOREIGN KEY (cpfJogador) REFERENCES pessoa(cpf)
            )";
    
            $conn->exec($sql);

            echo "Criado com sucesso!";

        } catch (PDOException $e) {
            echo "Ocorreu um erro na criação da tabela: " . $e->getMessage();
        }
    }
?>

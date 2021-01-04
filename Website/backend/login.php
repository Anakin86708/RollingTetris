<?php

    include_once 'conexao.php';

    try {
        $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);


    } catch (PDOException $e) {
        echo "Ocorreu um erro na conexão com o Banco de Dados: " . $e->getMessage();
    }
    
    // verifica se o login/senha está no nosso banco
    $sql = $conn->prepare("SELECT username FROM pessoa WHERE username = :u AND senha = :p");
    $sql->bindValue(":u", $_POST['username']);
    $sql->bindValue(":p", $_POST['password']);
    $sql->execute();

    if($sql->rowCount() > 0)
    {
        echo "usuario encontrado no banco, pode logar!";
    }
    else{ // USUARIO NAO ENCONTRADO
        header('Location: ../index.html');

    }


    

?>
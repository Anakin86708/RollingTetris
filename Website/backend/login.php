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
        session_start();
        $dadosUsuario = $sql->fetch(); // transforma todo o nosso select em um array associativo
        
        $_SESSION['logado'] = true;
        $_SESSION['username'] = $dadosUsuario['username']; // ao logar, é criado uma sessão para esse usuário.
        header('Location: ../game.php');

    }
    else{ // USUARIO NAO ENCONTRADO
        header('Location: ../index.html');
    }


    

?>
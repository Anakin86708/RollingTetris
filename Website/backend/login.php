<?php

include_once 'conexao.php';

$conn = getNewConnection();

// verifica se o login/senha está no nosso banco
$sql = $conn->prepare("SELECT cpf, senha, nome FROM pessoa WHERE usuario = :u");
$sql->bindValue(":u", $_POST['usuario']);
$sql->execute();

if ($sql->rowCount() > 0) {
    session_start();
    $senhaInserida = $_POST['senha'];
    $dadosUsuario = $sql->fetch(PDO::FETCH_ASSOC);
    $hash = $dadosUsuario['senha'];

    if (password_verify($senhaInserida, $hash)) {
        $_SESSION['logado'] = true;
        $_SESSION['usuario'] = $_POST['usuario'];
        $_SESSION['cpf'] = $dadosUsuario['cpf']; // ao logar, é criado uma sessão para esse usuário.
        $_SESSION['nome'] = $dadosUsuario['nome'];
        header('Location: ../game.php');
    } else {
        header('Location: ../index.html');
    }
} else {
    // USUARIO NAO ENCONTRADO
    header('Location: ../index.html');
}
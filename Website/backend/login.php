<?php

include_once 'conexao.php';

$conn = getNewConnection();

// verifica se o login/senha está no nosso banco
$sql = $conn->prepare("SELECT cpf, senha FROM pessoa WHERE usuario = :u");
$sql->bindValue(":u", $_POST['usuario']);
$sql->execute();

if ($sql->rowCount() > 0) {
    session_start();
    $senhaInserida = $_POST['senha'];
    $dadosUsuario = $sql->fetch(PDO::FETCH_ASSOC); // transforma todo o nosso select em um array associativo
    $hash = $dadosUsuario['senha'];

    if (password_verify($senhaInserida, $hash)) {
        $_SESSION['logado'] = true;
        $_SESSION['usuario'] = $_POST['usuario'];
        $_SESSION['cpf'] = $dadosUsuario['cpf']; // ao logar, é criado uma sessão para esse usuário.
        header('Location: ../game.php');
    } else {
        echo '<br>falso<br>';
        print_r($_POST);
        header('Location: ../index.html');
    }
} else {
    // USUARIO NAO ENCONTRADO
    echo 'não encontrado';
    header('Location: ../index.html');
}
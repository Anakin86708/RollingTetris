<?php
session_start();

if(!isset($_SESSION['logado']))
{
    header('location: index.html');
}
else
{
    $info_usuario = array(
        "nome" => $_POST["nome"],
        "telefone" => $_POST["telefone"],
        "email" => $_POST["email"],
        "senha" => password_hash($_POST['senha'], PASSWORD_DEFAULT),
        "cpf" => $_SESSION['cpf']
    );

    include_once 'conexao.php';

    $conn = getNewConnection();

    $stmt = $conn->prepare("UPDATE pessoa SET nome = :nome, telefone = :telefone, email = :email, senha = :senha WHERE cpf = :cpf");
    
    $stmt->execute($info_usuario);

    header('location: ../edit_info.php');

    // CRIAR FEEDBACK SE POSSÍVEL!!
}


?>
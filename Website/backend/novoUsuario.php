<?php
include_once 'conexao.php';

$info_usuario = array(
    "nome" => $_POST["nome"],
    "anoNascimento" => $_POST["aniversario"],
    "cpf" => $_POST["cpf"],
    "telefone" => $_POST["phone"],
    "email" => $_POST["mail"],
    "username" => $_POST["user"],
    "senha" => $_POST["senha"]
);

$conn = getNewConnection();


function insereDados($info_usuario, $conexao)
{
    $sql = "INSERT INTO pessoa (nome, nascimento, cpf, telefone, email, username, senha) VALUES (:nome, :anoNascimento, :cpf, :telefone, :email, :username, :senha)";
    $stm = $conexao->prepare($sql);
    $stm->execute($info_usuario);
    echo 'Sucesso ao inserir dados';
};

insereDados($info_usuario, $conn);

header("location: ../index.html"); // redireciona novamente para o index, assim o usuario poderá realizar o seu cadastro.

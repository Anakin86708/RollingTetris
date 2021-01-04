<?php
include_once 'conexao.php';

$info_usuario = array(
    "nome" => $_POST["nome"],
    "anoNascimento" => $_POST["aniversario"],
    "cpf" => $_POST["cpf"],
    "telefone" => $_POST["phone"],
    "email" => $_POST["mail"],
    "username" => $_POST["user"],
    // "senha" => md5($_POST["senha"]) // senha com o hash
    // "senha" => password_hash($_POST['senha'], PASSWORD_DEFAULT)
    "senha" => $_POST['senha']
);

$conn = getNewConnection();


    function insereDados($info_usuario, $conexao)
    {
        $sql = "INSERT INTO pessoa (nome, nascimento, cpf, telefone, email, username, senha) VALUES (:nome, :anoNascimento, :cpf, :telefone, :email, :username, :senha)";
        $stm = $conexao->prepare($sql);
        $stm->execute($info_usuario);
    };
    
    // header("location: ../index.html"); // redireciona novamente para o index, assim o usuario poderá realizar o seu cadastro.
    // CRIAR UM FEEDBACK PARA O USUARIO SE POSSIVEL
    
?>

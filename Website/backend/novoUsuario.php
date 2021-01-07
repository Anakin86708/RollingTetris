<?php
include_once 'conexao.php';

$info_usuario = array(
    "nome" => $_POST["nome"],
    "anoNascimento" => $_POST["aniversario"],
    "cpf" => tratamentoCPF(),
    "telefone" => $_POST["phone"],
    "email" => $_POST["mail"],
    "usuario" => $_POST["user"],
    "senha" => password_hash($_POST['senha'], PASSWORD_DEFAULT)
);

$conn = getNewConnection();


    function insereDados($info_usuario, $conexao)
    {
        $sql = "INSERT INTO pessoa (nome, nascimento, cpf, telefone, email, usuario, senha) VALUES (:nome, :anoNascimento, :cpf, :telefone, :email, :usuario, :senha)";
        $stm = $conexao->prepare($sql);
        $stm->execute($info_usuario);
    };

    function tratamentoCPF() {
        return str_replace("-", "", filter_var($_POST["cpf"], FILTER_SANITIZE_NUMBER_INT));
    }
    
    header("location: ../index.html"); // redireciona novamente para o index, assim o usuario poderá realizar o seu cadastro.
    
?>

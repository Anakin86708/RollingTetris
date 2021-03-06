<?php
include_once 'novoUsuario.php';

if (isset($_POST['botaoSubmissao'])) {
    $conn = getNewConnection();
    $nome       = $_POST["nome"];
    $nascimento = $_POST["aniversario"];
    $cpf        = tratamentoCPF();
    $telefone   = $_POST["phone"];
    $email      = $_POST["mail"];
    $username   = $_POST["user"];
    $senha      = $_POST["senha"];

    // algum campo vazio
    if (empty($nome) || empty($nascimento) || empty($cpf) || empty($telefone) || empty($email) || empty($username) || empty($senha)) {
        header('Location: ../register.html');
        exit();
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: ../register.html');
        exit();
    }
    // regex para username
    else if (!preg_match("/^[a-z0-9]*$/i", $username)) {
        header('Location: ../register.html');
        exit();
    }

    else {
        $sql = $conn->prepare("SELECT cpf, usuario FROM pessoa WHERE usuario = ? OR cpf = ?");

        $sql->bindValue(1, $username);
        $sql->bindValue(2, $cpf);
        $sql->execute();  // se retornar algo, já está cadastrado

        if ($sql->rowCount() > 0) {
            header('Location: ../feedback.html');
        } else {
            $info_usuario = array(
                "nome" => $_POST["nome"],
                "anoNascimento" => $_POST["aniversario"],
                "cpf" => tratamentoCPF(),
                "telefone" => $_POST["phone"],
                "email" => $_POST["mail"],
                "usuario" => $_POST["user"],
                "senha" => password_hash($_POST['senha'], PASSWORD_DEFAULT)
            );

            insereDados($info_usuario, $conn);
            header('Location: ../index.html'); // falta feedback p/usuario se der tempo 
        }
    }
}

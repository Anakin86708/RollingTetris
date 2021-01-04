<?php
    include_once 'novoUsuario.php';

    if(isset($_POST['botaoSubmissao']))
    {
        $nome       = $_POST["nome"];
        $nascimento = $_POST["aniversario"];
        $cpf        = $_POST["cpf"];
        $telefone   = $_POST["phone"];             
        $email      = $_POST["mail"];
        $username   = $_POST["user"];           
        $senha      = $_POST["senha"];               

        // algum campo vazio   COMO TEM O REQUIRED DO HTML, É NECESSÁRIO TER ISSO DAQUI?     
        if(empty($nome) || empty($nascimento) || empty($cpf) || empty($telefone) || empty($email) || empty($username) || empty($senha))
        {
            header('Location: ../register.html');
            exit();
        }
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            header('Location: ../register.html');
            exit();
        }
        // regex para username
        else if(!preg_match("/^[a-z0-9]*$/i", $username))
        {
            header('Location: ../register.html');
            exit();
        }

        // verifica se o username já está cadastrado
        else
        {
           $sql = $conn->prepare("SELECT username FROM pessoa WHERE username = :user");

           $sql->bindValue(":user", $username);
           $sql->execute();  // se retornar algo, já está cadastrado

           if($sql->rowCount() > 0)
           {
                echo "usuario já está cadastrado, tente um novo email";
           }
           else{
                insereDados($info_usuario, $conn);
                echo "castrado realizado com sucesso!";
                // header('Location: ../index.html'); // ariel havia pedido para retornar para o index.
           }
        }
    }
?>